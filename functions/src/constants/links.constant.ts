import { EMPTY_LINK_ITEM, ILinkItem, makeLinks } from "../utils/make-links.util";

interface IAppLink {
	api: {
		test: ILinkItem;
		dah:{
			counters: ILinkItem;
			apartments: ILinkItem;
			updateCounter: ILinkItem;
		}
		crypt: ILinkItem;
		viber: {
			setup: ILinkItem;
			unsetup: ILinkItem;
			webhook: ILinkItem;
		}
	}
}

export const LINKS = makeLinks<IAppLink>({
	api: {
		test: EMPTY_LINK_ITEM,
		crypt: EMPTY_LINK_ITEM,
		viber: {
			setup: EMPTY_LINK_ITEM,
			unsetup: EMPTY_LINK_ITEM,
			webhook: EMPTY_LINK_ITEM,
		},
		dah: {
			counters: EMPTY_LINK_ITEM,
			apartments: EMPTY_LINK_ITEM,
			updateCounter: EMPTY_LINK_ITEM,
		}
	}
});
