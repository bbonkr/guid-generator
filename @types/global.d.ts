export declare global {
    interface Window {
        gtag: (action: string, id: string, pageviewsParameter: PageviewOptions) => void;
    }
}

export interface PageviewOptions {
    page_title?: string;
    page_location?: string;
    page_path?: string;
}
