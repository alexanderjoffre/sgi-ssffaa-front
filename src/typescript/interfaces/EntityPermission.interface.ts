export interface ICanWrite<T> {
	create(entity: T): Promise<boolean>;
	update(id: string, entity: T): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}

export interface ICanRead<T> {
	find(query: Record<string, any>): Promise<T[]>;
	findOne(id: string): Promise<T>;
}

export interface ICanLogin<T> {
	login(email: string, password: string): Promise<T>;
}