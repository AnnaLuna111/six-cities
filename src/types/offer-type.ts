export interface Location {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface City {
  name: string;
	location: Location;
}

export interface OfferProps {
	title: string;
	type: string;
	price: number;
	isFavorite: boolean;
	isPremium?: boolean;
	rating: number;
	previewImage: string;
	id: string;
	city: City;
	location: Location;
	description: string;
	bedrooms: number;
	goods: string[];
	host: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	images: string[];
	maxAdults: number;
}
