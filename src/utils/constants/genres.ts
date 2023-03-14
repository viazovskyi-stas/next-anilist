import { v4 as uuidv4 } from 'uuid';

export const genres: Array<{id: string, name: string}> = [
	{ id: uuidv4(), name: "Action"},
	{ id: uuidv4(), name: "Adventure"},
	{ id: uuidv4(), name: "Drama"},
	{ id: uuidv4(), name: "Sci-Fi"},
	{ id: uuidv4(), name: "Action"},
]
