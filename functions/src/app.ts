import { encrypt, decrypt } from "./utils/crypt.util";
import { ENV } from "./constants/env.constants";
import { LINKS } from "./constants/links.constant";
import { useGetCounterDataAsync } from "./api/get-counter-data.hook";

const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
require("module-alias/register");
require("dotenv").config();

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());

app.get(LINKS.api.test.toString(), async (req: any, res: any) => {
	const { page, size } = req.query;
	if (page === undefined) {
		res.status(400).send(`missed 'page' query paramenter`)
	}
	if (size === undefined) {
		res.status(400).send(`missed 'size' query paramenter`)
	}
	const { data, error } = await useGetCounterDataAsync({ period: '2022-10-01', resourceType: 'COLD_WATER' },{page: Number(page), size: Number(size)});
	if (data) {
		res.send(data);
	}
	else {
		res.status(400).send(error);
	}
});

app.get(LINKS.api.crypt.toString(), (_req: any, res: any) => {
	const input = '{"clientId":"OSBB_CABINET_WEB","clientType":"WEB","deviceId":"e6f8e8efcd607ab421256a1a66d96503","password":"","login":""}';
	const hw = encrypt(input);
	console.log(hw);
	console.log(decrypt(hw));
  
	res.send({
		input,
		encrypt: hw,
		// decrypt: decrypt(hw),
		// decrypt2: decrypt({
		//   iv: ENV.DAH_IV || "",
		//   encryptedData: ENV.DAH_ENCRYPTED_DATA || "",
		// }),
	});
  });

app.get(LINKS.api.viber.webhook.toString(), (_req: any, res: any) => {
  res.send(
    Object.values(LINKS).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK
  );
});

app.post(LINKS.api.viber.webhook.toString(), async (req: any, res: any) => {
  const body = req.body;

  console.log("webhook-body", body);
  //Warning!!! when setup set to false
  const DEBUG_VERSION = true;
  if (DEBUG_VERSION) {
    try {
      axios
        .post(`${ENV.PROXY_WEB_HOOK}`, body)
        .then(() => {
          console.log("webhook-result success");
          //   res.status(200).send();
        })
        .catch((error: any) => {
          console.log("webhook-result error", error);
          //   res.status(200).send();
        });

      //todo example
      res.status(200).send();
    } catch (error) {
      console.log("error = ", error);
      res.status(400).send(error);
    }
  } else {
    res.status(200).send();
  }
});

app.get(LINKS.api.viber.setup.toString(), async (_req: any, res: any) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        url: `${ENV.VIBER_WEB_HOOK}`,
        event_types: [
          //   "delivered",
          //   "seen",
          "failed",
          "subscribed",
          "unsubscribed",
          "message",
          "conversation_started",
        ],
        send_name: true,
        send_photo: true,
      },
      getAxiosConfig()
    );
    console.log(data.data);
    res.status(200).send(data.data);
  } catch (error) {
    console.log("error = ", error);
    res.status(400).send(error);
  }
});

app.get(LINKS.api.viber.unsetup.toString(), async (_req: any, res: any) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        url: "",
      },
      getAxiosConfig()
    );
    console.log(data.data);
    res.status(200).send(data.data);
  } catch (error) {
    console.log("error = ", error);
    res.status(400).send(error);
  }
});

function getAxiosConfig() :any{
  return {
    headers: {
      "X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN,
    },
  };
}
module.exports = app;
