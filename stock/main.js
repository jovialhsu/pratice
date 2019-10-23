
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
                    let opendata='testOpendata.php'
                    axios.get(opendata).then((stocks)=>{
                       this.stocks=stocks.data;
                        console.log(stocks)});
                       //console.log( axios.get(opendata));                            
            },

        });
       