/// <reference types="node" />

declare var require: {
    context(
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp
    ): {
        keys(): string[];
        (id: string): any;
        <T>(id: string): T;
        resolve(id: string): string;
        id: string;
    };
};
