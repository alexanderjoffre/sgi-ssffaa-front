interface PageMetaContent {
	kw?: string;
	desc?: string;
	title: string;
}

interface PageComntent {
	meta: PageMetaContent;
}

export interface IIntlText {
	pages: Record<string, PageComntent>;
}