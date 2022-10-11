export const positionSet = (arr, y_Height, w_width) => {
	let objMessage = { 'picWidth': '', 'top': '', 'left': '' };
	arr=arr.map(v=>{
		return {...v,...objMessage}
	})
	arr.forEach((item,index)=>{
		item.picWidth = 76 + Math.random() * 12;
		item.top = Math.random() * (y_Height - objMessage.picWidth) / 2;
		item.left = Math.random() * (w_width - objMessage.picWidth) / 2.4;
	})
    return arr
}