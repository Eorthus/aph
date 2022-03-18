//import "../css/style.css";
//import "../css/style.scss";
//import "../img/images.js";



const arrow = document.querySelector('.filter-head-img');
const filter = document.querySelector('.filter-head');
filter.onclick = function () {
    arrow.classList.toggle('rotate')
}


const API = 'https://jsonplaceholder.typicode.com/posts';
class List {
    constructor() {
        this.container = '.bottom-ul';
        this.url = this.API;
        this.goods = [];
        this.item;
    }
    getJson(url) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: 'TODO item 1',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                this.item = json;

                for (let i = 0; i < 5; i++) {
                    this.item.userId++;
                    this.goods.push(this.item);

                }
                this.render(this.goods);
                this.addElement(this.goods);
                // this.delElement();
                this.filter();
                this.checked();

            });
    }
    filter() {
        document.querySelector('.filter').onclick = function (e) {
            e.target.closest('.filter-checkbox').classList.toggle('selected');
            e.target.closest('.filter-checkbox').querySelector('.mark').classList.toggle('mark-checked');
            e.target.closest('.filter-checkbox').querySelector('.filter-checkbox-label').classList.toggle('label-checked');


        }
        document.getElementById('done').onclick = function () {
            let inwork = document.querySelectorAll('.inwork')
            inwork.forEach(element =>
                element.classList.toggle('invisible')
            )

        }
        document.getElementById('inwork').onclick = function () {
            let done = document.querySelectorAll('.done')

            done.forEach(element =>
                element.classList.toggle('invisible')
            )

        }
        document.getElementById('all').onclick = function () {
            let all = document.querySelectorAll('.bottom-ul-li')
            all.forEach(element => element.classList.toggle('invisible'))
        }
    }
    checked() {

        document.querySelector('.bottom-ul').onclick = function (e) {

            e.target.closest('.bottom-ul-li').classList.toggle('done');
            e.target.closest('.bottom-ul-li').classList.toggle('inwork');
            e.target.closest('.bottom-ul-li').querySelector('.bottom-ul-li-span').classList.toggle('span-checked');
            e.target.closest('.bottom-ul-li').querySelector('.bottom-ul-li-check-img').classList.toggle('img-checked');

        }



    }
    addElement(goods) {
        document.querySelector('.middle-enter').onclick = function () {
            let newadd = document.getElementById('todo-add').value;
            let product = {
                title: newadd,
                userId: 2,
                id: 102,
            };
            goods.push(product);
            list.renderOne(product)
        }
        document.querySelector('.middle-input').addEventListener("keydown", function (event) {
            if (event.keyCode == 13) {
                console.log(12)
                let newadd = document.getElementById('todo-add').value;
                let product = {
                    title: newadd,
                    userId: 2,
                    id: 102,
                };
                goods.push(product);
                list.renderOne(product)
            }
        });

    }
    /*    delElement() {
            document.querySelector('.bottom-ul').onclick = function (e) {
                console.log(e.target);
                if (e.target == `<button class="bottom-ul-li-cross">x</button>`) {
                    console.log(e.target.closest('bottom-ul-li'))
                    e.target.closest('bottom-ul-li').classList.add('invisible');
                }
            }
        }*/
    save() {
        document.querySelector('.bottom-ul').insertAdjacentHTML('beforeend', (localStorage.getItem("html")));
        list.filter();
        console.log(1);

        list.checked();
        list.addElement(JSON.parse(localStorage.getItem("js")));
        //   list.delElement();
        setInterval(() => {
            localStorage.setItem("html", document.querySelector('.bottom-ul').innerHTML);
            localStorage.setItem("js", JSON.stringify(list.goods));
        }, 0)

    }
    render(goods) {
        document.querySelector('.bottom-ul').innerHTML = "";
        for (let item of goods) {
            document.querySelector('.bottom-ul').insertAdjacentHTML('beforeend',
                `<li class="bottom-ul-li  inwork">
<div class="bottom-ul-li-check"><img class="bottom-ul-li-check-img" src="./img/round.svg"
        alt="checked"></div>
<span class="bottom-ul-li-span">${item.title}</span>
<button class="bottom-ul-li-cross">x</button>
</li>`
            )
        }
        localStorage.setItem("html", document.querySelector('.bottom-ul').innerHTML);
        localStorage.setItem("js", JSON.stringify(goods));
    }
    renderOne(item) {

        document.querySelector('.bottom-ul').insertAdjacentHTML('beforeend',
            `<li class="bottom-ul-li  inwork">
<div class="bottom-ul-li-check"><img class="bottom-ul-li-check-img" src="./img/round.svg"
        alt="checked"></div>
<span class="bottom-ul-li-span">${item.title}</span>
<button class="bottom-ul-li-cross">x</button>
</li>`
        )
    }
}
class itemlist extends List {
    constructor() {
        super(item, goods)
        this.item = item;
        this.goods = goods;
        this.title;
        this.id;
        this.UserId;
    }
}

let list = new List();
if (localStorage.getItem("html")) {
    list.save();
} else {
    list.getJson(API);
}


