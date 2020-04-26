
      Vue.config.devtools = true;
      Vue.component('demo-grid',{
          template:'#grid-template',
          props:{
              stocks:Array,
              columns:Array,
              filterKey:String
          },
          data:function(){
              var sortOrders = {}
              this.columns.forEach(function(key){
                  sortOrders[key] = 1
              })
              return {
                  sortKey:'',
                  sortOrders:sortOrders
              }
          },
          computed:{
              filteredStocks:function(){
                var sortKey =this.sortKey
                var filterKey = this.filterKey && this.filterKey.toLowerCase()
                var order = this.sortOrders[sortKey] || 1
                var stocks = this.stocks
                if(filterKey){
                    stocks = stocks.filter(function(row){
                        return Object.keys(row).some(function(key){
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if(sortKey){
                    stocks =  stocks.slice().sort(comparer);
                    function comparer(a, b) {
                        var valA = a[sortKey].replace(/,/g, ""),
                            valB = b[sortKey].replace(/,/g, "");
                        return ($.isNumeric(valA) && $.isNumeric(valB) ?
                          valA - valB : valA.localeCompare(valB))*order;
                      }
                }
                return stocks
              }

          },
          methods:{
              sortBy:function(key){
                  this.sortKey = key
                  this.sortOrders[key] = this.sortOrders[key] * -1
              }
          }
      })
  
      new Vue({
            el: '#app',
            data: {
                searchQuery:'',
                key:'',
                gridColumns:['證券代號','證券名稱','開盤價','收盤價','最高價','最低價','漲跌價差','成交金額'],
                stocks:[],
            },
            mounted() {
                    let opendata='https://quality.data.gov.tw/dq_download_json.php?nid=11549&md5_url=bb878d47ffbe7b83bfc1b41d0b24946e'
                    axios.get(opendata).then((stocks)=>{
                       this.stocks=stocks.data;
                        console.log(stocks)});
                       //console.log( axios.get(opendata));  
                  
                  //const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
            //     const url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data'; // origin api url

                    
            //            /** fetch api url by cors-anywhere */
            //         axios.get(`${cors}${url}`)
            //         .then((response) => {
            //             //this.stocks =JSON.parse( response.data);
            //             var tempData = response.data.split(/\n|\r\n/);///代表用enter鍵/和shift+enter鍵換行的情況
            //             var result = [];
            //             var headers= tempData[0].split(",");
            //             for (var i = 1; i<tempData.length;i++){
            //                 var obj={};
            //                 var currentData=tempData[i].split(",");
            //                 for(var j = 0; j<headers.length;j++){
            //                     obj[headers[j]] = currentData[j]
            //                 }
            //                 result.push(obj)
            //             }
            //             return  console.log(JSON.stringify(result));
            //             //this.stocks=stocks.data;

            //         //this.stocks =JSON.stringify(msg)
                    
            //         },
            //         (error) => {
            //         }
            //         );                            
            // },
            },

        });
       
