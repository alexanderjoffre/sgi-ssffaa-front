import { IHasUuid } from "../typescript/interfaces/HasUuid.interface";

export class ArrayHelper {

	private constructor() {}

	public static getPagedData<T>(dataSet: T[], recordsPerPage: number): Map<number, T[]> {
		const pagesCount = this.getPagesCount(dataSet, recordsPerPage);
		const mapper: Map<number, T[]> = new Map([]);

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

}