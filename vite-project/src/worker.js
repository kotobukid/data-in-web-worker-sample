// vite dev時Firefoxでは動作しない模様？

const items = [
    {id: 1, name: "taro", sex: 'male'},
    {id: 2, name: "jiro", sex: 'male'},
    {id: 3, name: "saburo", sex: 'male'},
    {id: 4, name: "hanako", sex: 'female'},
    {id: 5, name: "yoshiko", sex: 'female'},
    {id: 6, name: "jane", sex: 'female'},
    {id: 7, name: "mary", sex: 'female'},
    {id: 8, name: "jack", sex: 'male'},
    {id: 9, name: "gengoro", sex: 'male'},
];
const post_items = (_items) => {
    console.log(_items);
    self.postMessage({type: "filtered_item", _items});
}

let filter_word = '';
let sex = '';

self.addEventListener('message', ({data}) => {
    console.log(data);
    switch (data.type) {
        case 'word':
            filter_word = data.word;
            break;
        case 'sex':
            sex = data.sex;
            break;
        case 'clear':
            filter_word = '';
            sex = '';
            break;
        default:
            break;
    }
    console.log({
        filter_word, sex
    })
    post_items(items.filter((i) => {
        return (i.name.indexOf(filter_word) > -1)
            && (sex === '' ? true : i.sex === sex)
    }));
});

export default {}