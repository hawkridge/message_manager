import uniqid from 'uniqid';

export function generateID() {
	return uniqid.time()
}

export function addZeroPadding(value) {
	return value < 10 ? '0' + value : value;
}

export function parseDate(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = addZeroPadding(date.getMonth() + 1);
	const day = addZeroPadding(date.getDate());
	
	return `${day}.${month}.${year}`
}

export function parseTime(dateString) {
	const date = new Date(dateString);
	const hours = addZeroPadding(date.getHours());
	const minutes = addZeroPadding(date.getMinutes());
	
	return  `${hours}:${minutes}`
}

export function getPrettyDate(dateString) {
	const date = new Date(dateString);
	const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
	
	return date.toLocaleDateString('en-UK', options)
}

export function sortByDate(entity1, entity2) {
	const value1 = +new Date(entity1.date);
	const value2 = +new Date(entity2.date);
	return value2 - value1
}
