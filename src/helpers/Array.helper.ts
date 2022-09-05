import { IHasUuid } from "../typescript/interfaces/HasUuid.interface";

export class ArrayHelper {

	private constructor() {}

	public static getPagedData(dataSet: IHasUuid[], recordsPerPage: number): Map<number, IHasUuid[]> {
		const pagesCount = this.getPagesCount(dataSet, recordsPerPage);
		const mapper: Map<number, IHasUuid[]> = new Map([]);

		Array.from( Array(pagesCount).keys() ).forEach(
			(index: number) => {
				const page = index + 1;
				const data = dataSet.slice((page - 1) * recordsPerPage, page * recordsPerPage);

				mapper.set( page, data );
			}
		);
		return mapper;
	}

	public static getPagesCount(dataSet: any[], recordsPerPage: number): number {
		return Math.ceil(dataSet.length / recordsPerPage);
	}

	public static filterObjectArray(dataSet: IHasUuid[], filter: string): IHasUuid[] {
		const results: IHasUuid[] = dataSet.filter( ({uuid, ...recordWithoutUuid}) => {
			const dataValues: string = Object.values(recordWithoutUuid).join(',');

			const filtrosInput: string[] = filter.split(',');
			
			return filtrosInput.every(
				(filter: string) => dataValues.match(new RegExp(filter.trim(), 'ig'))
			);
		});

		return results;
	}

	public static sortByColumnAsc = (dataSet: IHasUuid[], attribute: string) => {
		dataSet.sort(
			( a: IHasUuid, b: IHasUuid ) => {
				if ( a[attribute] < b[attribute] ) { return -1; }
				if ( a[attribute] > b[attribute] ) { return 1; }
				return 0;
			}
		);
		return dataSet;
	}
	
	public static sortByColumnDesc = (dataSet: IHasUuid[], attribute: string) => {
		dataSet.sort(
			( a: IHasUuid, b: IHasUuid ) => {
				if ( a[attribute] > b[attribute] ) { return -1; }
				if ( a[attribute] < b[attribute] ) { return 1; }
				return 0;
			}
		);
		return dataSet;
	}

}