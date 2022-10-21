export interface ILinkItem {
    toString: () => string;
    formattedName?: string;
}

export class LinkItem implements ILinkItem {
    public name = '';
    public formattedName = '';
    public parent: LinkItem | undefined = undefined;
    private _canFormatRouteName? = true;

    toJSON(): string {
        return this.toString();
    }

    constructor(
        name: string,
        parent?: LinkItem | undefined,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        routes?: any,
        canFormatRouteName?: boolean,
    ) {
        this.name = name;
        this.formattedName = canFormatRouteName ? formatRouteName(name) : name;

        this.parent = parent;
        this._canFormatRouteName = canFormatRouteName;
        if (routes && typeof routes === 'object') {
            const keys = Object.keys(routes);
            keys.forEach((key) => {
                const value = routes[key];
                const self = this as unknown as any;
                if (typeof value === 'function' && key.startsWith('external_')) {
                    self[key] = (arg1: string, arg2: string, arg3: string): LinkItem => {
                        return value(arg1, arg2, arg3);
                    };
                } else if (typeof value === 'function') {
                    const subRoutes = value();
                    self[key] = (arg: string): LinkItem => {
                        //if argument not passed into function - then add ':' symbol before key.
                        return new LinkItem(arg || ':' + key, this, subRoutes, false);
                    };
                } else if (value instanceof LinkItem) {
                    self[key] = value.name;
                } else {
                    self[key] = new LinkItem(key, this, value, true);
                }
            });
        }
    }

    toString(): string {
        const name = this._canFormatRouteName ? formatRouteName(this.name) : this.name;
        return this.parent ? this.parent + '/' + name : name;
    }
}

const formatRouteName = (str: string): string => {
    if (str === 'index') {
        return '';
    }
    return str.toString().replace(/([A-Z])/g, (str) => '-' + str.toLowerCase());
};

export function makeLinks<T>(routes: T): T {
    return new LinkItem('', undefined, routes, true) as unknown as T;
}

export const EMPTY_LINK_ITEM: ILinkItem = {} as unknown as ILinkItem;
