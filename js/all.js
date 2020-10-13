// $('#question').on('click', function () {
//     // alert('hi');
//     $('.directory .situation').removeClass("active");
//     $('.directory .question').addClass("active");
//     $('#showposter').show();
// });
$('.directory .question').on('click', function () {
    // alert('hi');
    $('.directory .situation').removeClass("active");
    $('.directory .question').addClass("active");
    $('#showposter').show();
    $('input#m-ctrl').prop("checked", false);
});


$('#showposter .close').on('click', function () {
    // alert('hi');
    $('.directory .situation').addClass("active");
    $('.directory .question').removeClass("active");
    $('#showposter').css("display", "none");
});


// $('#address').on('click', function () {
//     // alert('hi');
//     let vale = $('section.Searchbar > .from').attr('class').indexOf("active");
//     // console.log(vale)
//     if (vale == -1) {
//         // alert('hi');
//         $('section.Searchbar > .from').addClass("active");
//         $('section.Information').hide();
//         $('section.SearchResult').hide();
//         $('section.itemshow').hide();
//         $('footer').hide();
//         $('#address').val('');
//     } else {
//         $('section.Searchbar > .from ul').addClass("trigger");
//     }
// });


// $('a.leftbtn').on('click', function () {
//     // alert('hi');
//     $('section.Searchbar > .from').removeClass("active");
//     $('section.Information').show();
//     $('section.SearchResult').show();
//     $('section.itemshow').show();
//     $('footer').show();
//     $('section.Searchbar > .from ul').removeClass("trigger");
// });


$('section.Searchbar > .from ul > li > .del').on('click', function () {
    $('section.Searchbar > .from ul').removeClass("trigger");
});



Vue.component('maskcard', {
    props: ['cardItem', 'gpsdata'],
    template: `
    <div class="card" >
        <div class="cardtop">
            <div class="nub adult" :class="[maskAdultClass]">
                <h4 class="">成人口罩數量</h4>
                <p class="masks">{{cardItem.properties.mask_adult}}<span class="">片</span></p>
                <span class="icon" :class="[maskAdultIconClass]"></span>
            </div>
            <div class="nub child" :class="[maskChildClass]">
                <h4 class="">兒童口罩數量</h4>
                <p class="masks">{{cardItem.properties.mask_child}}<span class="">片</span></p>
                <span class="icon" :class="[maskChildIconClass]"></span>
            </div>
            <div class="error" v-if="cardItem.properties.mask_adult == null || cardItem.properties.mask_child == null">
                <p class="">Oops! 資料迷路中... <br><br>稍後回來</p>
            </div>
        </div>
        <div class="cardbottom">
            <div class="ShopName" @click.prevent="cardFun">
                <span class="line" :class="BusinessClass"></span>
                <h3 class="name">{{cardItem.properties.name}}<span class="distance">{{dis}} km</span></h3>
                <p class="business" :class="BusinessClass">{{Businessname}}</p>
            </div>
            <div class="ShopInformation">
                <p class="">
                    地址<span class="">{{cardItem.properties.address}}</span>
                    <a v-bind:href="'https://www.google.com.tw/maps/place/' +cardItem.properties.address" target="_blank">於地圖查看</a>
                </p>
                <p>
                    電話<span class="">{{cardItem.properties.phone}}</span>
                    <a v-bind:href="'tel:' +cardItem.properties.phone">撥打電話</a>
                </p>
                <p class="Remarks">備註</p>
                 <p class="Remarkstext">{{cardItem.properties.note}}</p>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            BusinessClass: {
                "bg-DarkCyan": false,
                "bg-SecondaryOrange": false,
                "bg-Gray": false,
            },
            Businessname: '',
            maskAdultClass: '',
            maskAdultIconClass: '',
            maskChildClass: '',
            maskChildIconClass: '',
            dis: 0,
        };
    },
    methods() {
        const vm = this;
        vm.maskAdultClass = '';
        vm.maskAdultIconClass = '';
        vm.maskChildClass = '';
        vm.maskChildIconClass = '';
    },
    created() {
        // 城市空汙顏色
        this.adultClass(this.cardItem.properties.mask_adult);
        this.childClass();
        this.distance();
        this.isOpening(this.cardItem.properties.service_periods, this.cardItem.properties.name);
    },
    methods: {
        cardFun: function () {
            this.$emit("itemname", this.cardItem);
        },
        adultClass: function (e) {
            this.maskAdultClass = "";
            this.maskAdultIconClass = "";
            if (e >= 200) {
                console.log(e);
                this.maskAdultClass = "bg-MainColor";
                this.maskAdultIconClass = "icon-Tick";
            } else if (e > 0) {
                this.maskAdultClass = "bg-VividOrange";
                this.maskAdultIconClass = "icon-Marvel";
            } else {
                this.maskAdultClass = "bg-DarkGrayish";
                this.maskAdultIconClass = "icon-Cross";
            }
        },
        childClass: function () {
            this.maskChildClass = "";
            this.maskChildIconClass = "";
            if (this.cardItem.properties.mask_child >= 200) {
                console.log(this.cardItem.properties.mask_child);
                this.maskChildClass = "bg-MainColor";
                this.maskChildIconClass = "icon-Tick";
            } else if (this.cardItem.properties.mask_child > 0) {
                this.maskChildClass = "bg-VividOrange";
                this.maskChildIconClass = "icon-Marvel";
            } else {
                this.maskChildClass = "bg-DarkGrayish";
                this.maskChildIconClass = "icon-Cross";
            }
        },
        distance: function () {
            // console.log(this.gpsdata[0]);
            let R = 6378.137;
            const lng1 = this.gpsdata[1];
            const lat1 = this.gpsdata[0];
            const lng2 = this.cardItem.geometry.coordinates[0];
            const lat2 = this.cardItem.geometry.coordinates[1];
            const NowNTUlng = Math.floor(lng1 * 100000);
            const NowNTUlat = Math.floor(lat1 * 100000);
            const shopNTUlng = Math.floor(lng2 * 100000);
            const shopNTUlat = Math.floor(lat2 * 100000);
            // console.log(lat1, lng1, lat2, lng2);
            const radLat1 = lat1 * Math.PI / 180.0;
            const radLat2 = lat2 * Math.PI / 180.0;
            const deltaLat = radLat1 - radLat2;
            const deltaLng = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
            const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
            const dis = s * R;
            const Distance = Math.round(dis * 10000) / 10000;
            // console.log('距離' + Distance.toFixed(2) + 'km');
            this.dis = Distance.toFixed(2);

            // const Distance = [(NowNTUlongitude - shopNTUlongitude) ^ 2 + (NowNTUlatitude - shopNTUlatitude) ^ 2] ^ (1 / 2);
            // console.log('距離' + Distance);
        },
        isOpening(time, name) {
            let isOpening;
            let openingBg;
            if (!time || time === '') {
                this.Businessname = '無資料';
                this.BusinessClass["bg-Gray"] = true;
            } else {
                // console.log('營業時間' + time);
                const morning = time.split('').slice(0, 7);
                const afternoon = time.split('').slice(7, 14);
                const night = time.split('').slice(14, 21);
                let today = new Date().getDay();
                if (today != 0) {
                    today = today;
                    // console.log('today:' + today);
                } else {
                    today = 7;
                    // console.log('today:' + today);
                }
                const hour = new Date().getHours();
                // console.log('hour:' + hour);
                if (hour < 9 || hour >= 21) {
                    // 0~9 & 21點以後
                    this.BusinessClass["bg-Gray"] = true;
                    this.Businessname = "休息中";

                } else if (hour >= 9 && hour < 14) {
                    // 上午 9~13
                    // console.log('name' + name);
                    // console.log('morning' + morning);
                    // console.log('nowtime:' + morning[today - 1]);
                    if (morning[today - 1] === 'Y') {
                        this.BusinessClass["bg-Gray"] = true;
                        this.Businessname = "休息中";
                    } else {
                        this.BusinessClass["bg-DarkCyan"] = true;
                        this.Businessname = "營業中";
                    };

                } else if (hour >= 14 && hour < 18) {
                    // 下午 14~17
                    // console.log('name' + name);
                    // console.log('afternoon' + afternoon);
                    // console.log('nowtime:' + afternoon[today - 1]);
                    if (afternoon[today - 1] === 'Y') {
                        this.BusinessClass["bg-Gray"] = true;
                        this.Businessname = "休息中";
                    } else {
                        this.BusinessClass["bg-DarkCyan"] = true;
                        this.Businessname = "營業中";
                    };
                } else if (hour >= 18 && hour < 22) {
                    // 晚上 18~21
                    // console.log('name' + name);
                    // console.log('night' + night);
                    // console.log('nowtime:' + night[today - 1]);
                    if (night[today - 1] === 'N') {
                        this.BusinessClass["bg-Gray"] = true;
                        this.Businessname = "休息中";
                    } else {
                        this.BusinessClass["bg-DarkCyan"] = true;
                        this.Businessname = "營業中";
                    };

                    if (hour === 20 && isOpening === '營業中') {
                        this.BusinessClass["bg-Gray"] = true;
                        this.Businessname = "休息中";
                    }
                }
            }
            return { status: isOpening, color: openingBg, };
        },
    },

});

const bounds = new L.LatLngBounds(new L.LatLng(25.799891182088334, 126.70532226562501), new L.LatLng(21.468405577312012, 116.15844726562501));
let map = L.map('map', {
    center: [25.033671, 121.564427],
    zoom: 15,
    minZoom: 3,
    maxZoom: 18,
    MaxBounds: bounds,
});
map.setMaxBounds(bounds);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var markers = new L.MarkerClusterGroup().addTo(map);
// vue

var app = new Vue({
    el: '#app',
    data: {
        Location: 'Currently',
        searchdata: '目前位置',
        onSearch: false,
        maskdata: null,
        openNub: 5,
        remaincard: 0,
        receiveNub: '全民',
        userPosition: [25.033671, 121.564427],
        keywords: [],
    },
    created() {
        this.getData();
        this.getWeek();
        this.GetSearchHistory();
        this.mapshow();
    },
    mounted() {
        const vm = this;
        navigator.geolocation.getCurrentPosition(function (res) {
            // 使用者接受存取地點，設定當前位置;使用者反對存取地點，預設地點101
            const { latitude, longitude } = res.coords;
            vm.userPosition = [latitude, longitude];
            map.setView(vm.userPosition, 16);
        });

    },
    methods: {
        openposter() {
            //觸發開啟介面
            $('.directory .situation').removeClass("active");
            $('.directory .question').addClass("active");
            $('#showposter').show();
        },
        openFill() {
            //觸發開啟介面
            const vm = this;
            let vale = $('section.Searchbar > .from').attr('class').indexOf("active");
            // console.log(vale)
            if (vale == -1) {
                $('section.Searchbar > .from').addClass("active");
                $('section.Information').hide();
                $('section.SearchResult').hide();
                $('section.itemshow').hide();
                $('footer').hide();
                if (vm.searchdata == "目前位置") {
                    vm.searchdata = "";
                }
            } else if (vale > -1 && vm.searchdata.length >= 1) {
                $('section.Searchbar > .from ul').addClass("trigger");
            }
        },
        openChecklist() {
            //觸發開啟介面
            $('section.Searchbar > .from ul').addClass("trigger");
        },
        closeFill() {
            //觸發關閉介面
            $('section.Searchbar > .from').removeClass("active");
            $('section.Information').show();
            $('section.SearchResult').show();
            $('section.itemshow').show();
            $('footer').show();
            $('section.Searchbar > .from ul').removeClass("trigger");
            const vm = this;
            if (vm.searchdata == "") {
                vm.searchdata = "目前位置";
                vm.Location = 'Currently'
            }
        },
        closeFillbox() {
            //觸發關閉介面
            $('section.Searchbar > .from ul > li > .del').on('click', function () {
                $('section.Searchbar > .from ul').removeClass("trigger");
            });
        },
        searchbar() {
            //收尋判斷1
            const vm = this;
            if (vm.onSearch == false && vm.searchdata == "") {
                vm.Location = 'Currently';
                vm.searchdata = "目前位置"
                vm.closeFill();
            } else {
                vm.closeFill();
            }
        },
        search(add) {
            //收尋判斷2
            const vm = this;
            vm.Location = 'search';
            vm.searchdata = add;
            vm.closeFill();
            vm.SaveSearchHistory();
        },
        SaveSearchHistory() {
            //儲存收尋紀錄
            const vm = this;
            vm.keywords = JSON.parse(localStorage.getItem('searchWords')) || [];
            if (vm.searchdata) {
                if (vm.keywords.length > 4) {
                    vm.keywords.pop();
                }
                vm.keywords.unshift(vm.searchdata);
                localStorage.setItem('searchWords', JSON.stringify(vm.keywords));
            }
            vm.GetSearchHistory();
        },
        ClearSearchHistory() {
            //清除歷史收尋紀錄
            const vm = this;
            vm.keywords = [];
            localStorage.setItem('searchWords', JSON.stringify(vm.keywords));
            vm.GetSearchHistory();
        },
        GetSearchHistory() {
            //取得歷史收尋紀錄
            const vm = this;
            vm.keywords = JSON.parse(localStorage.getItem('searchWords')) || [];
        },
        getWeek() {
            //取得星期
            let d = new Date();
            const vm = this;
            let week = d.getDay();
            if (week == 2 || week == 4 || week == 6) {
                vm.receiveNub = "偶數"
            } else if (week == 1 || week == 3 || week == 5) {
                vm.receiveNub = "奇數"
            } else {
                vm.receiveNub = "全民"
            }
        },
        getData() {
            // 使用 jQuery ajax
            const vm = this;
            const api = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
            $.get(api).then(function (response) {
                vm.maskdata = JSON.parse(response);
                // console.log(response);
                // vm.filterMask();
                vm.mapshow(vm.maskdata);
            });
        },
        Calculation5km: function (coordinates) {
            //計算距離
            const vm = this;
            let R = 6378.137;
            const lng1 = vm.userPosition[1];
            const lat1 = vm.userPosition[0];
            const lng2 = coordinates[0];
            const lat2 = coordinates[1];
            // console.log(lat1, lng1, lat2, lng2);
            const radLat1 = lat1 * Math.PI / 180.0;
            const radLat2 = lat2 * Math.PI / 180.0;
            let deltaLat = radLat1 - radLat2;
            let deltaLng = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
            let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
            let dis = s * R;
            let Distance = Math.round(dis * 10000) / 10000;
            let Dis = Distance.toFixed(2);
            return Dis;
        },
        mapshow() {
            const vm = this;
            console.log('標點');
            // console.log(vm.maskdata.features);
            const showicon = vm.maskdata.features;
            // console.log(showicon);
            function classname(nub) {
                if (nub >= 200) {
                    return "bg-MainColor";
                } else if (nub > 0) {
                    return "bg-VividOrange";
                } else {
                    return "bg-DarkGrayish";
                }
            }
            let markers = new L.MarkerClusterGroup().addTo(map);
            for (let i = 0; showicon.length > i; i++) {
                // console.log(showicon[i]);
                let adultnumclass = classname(showicon[i].properties.mask_adult);
                let childnumclass = classname(showicon[i].properties.mask_child);



                markers.addLayer(L.marker([showicon[i].geometry.coordinates[1], showicon[i].geometry.coordinates[0]])
                    .bindPopup(`
                    <div class='sblock' id='mask${showicon[i].properties.id}'>
                        <div  class='content'>
                            <h3 class='shopname' >${showicon[i].properties.name}</h3 >
                        </div>
                        <div class='mask'>
                            <div class='${adultnumclass} mr-1'> 成人口罩 
                                <span class='adultnum pr - 1 pl - 1'>${showicon[i].properties.mask_adult}</span >
                            </div >
                            <div class='${childnumclass}'> 兒童口罩 
                                <span class='childnum pr-1 pl-1' >${showicon[i].properties.mask_child}</span>
                            </div>
                        </div>
                    </div>`));
            }
            map.addLayer(markers);
        },
        gotomap(item) {
            console.log(item);
            map.setView([item.geometry.coordinates[1], item.geometry.coordinates[0]], 16);
            L.popup().setLatLng([item.geometry.coordinates[1], item.geometry.coordinates[0]]).setContent('<p>' + item.properties.name + '</p>').openOn(map);
        }
    },
    computed: {
        filterMaskdata() {
            //過濾
            const vm = this;
            let data = [];
            if (vm.maskdata) {
                if (vm.Location === 'search' && vm.searchdata) {
                    // 使用關鍵字搜尋，取得所有位置
                    let getMask = vm.maskdata.features.map(Gcity);
                    function Gcity(item) {
                        // console.log(item.Zone);
                        return item;
                    }
                    data = getMask.filter((pharmacy) => {
                        return `${pharmacy.properties.name} ${pharmacy.properties.address} `.includes(vm.searchdata)
                    });
                    if (data.length <= 5) {
                        vm.openNub = data.length;
                    } else {
                        vm.openNub = 5;
                    }
                    // console.log("文字" + data.length);
                } else {
                    // 預設，使用所在地，取得方圓五里內藥局（預設）
                    // console.log(vm.maskdata.features);
                    let getMask = vm.maskdata.features.map(Gcity);
                    function Gcity(item) {
                        // console.log(item.Zone);
                        return item;
                    }
                    data = getMask.filter((element) => {
                        let dis = vm.Calculation5km(element.geometry.coordinates);
                        // console.log(dis);
                        // return true
                        return dis <= 5;
                    });
                    data.sort((a, b) => vm.Calculation5km(a.geometry.coordinates) - vm.Calculation5km(b.geometry.coordinates));
                    // console.log(data);
                    if (data.length <= 5) {
                        vm.openNub = data.length;
                    } else {
                        vm.openNub = 5;
                    }
                    // console.log("預設" + data.length);
                }
            }
            return data;
        },
        uptime() {
            const vm = this;
            let data = "";
            if (vm.maskdata) {
                // console.log("time");
                let gettime = vm.maskdata.features[1].properties.updated;
                // console.log(gettime);
                data = gettime.split(" ");
                // console.log(data);

            }
            return data[1];
        }

    },
});