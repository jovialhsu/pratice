
        Vue.config.devtools = true;
      new Vue({
            el: '#app',
            data: {
                forecasts:[],
                input:{
                    type:'全部縣市',
                }
            },
            computed: {
                typeCounty(){
                    if(this.input.type =='全部縣市'){
                        return this.forecasts//
                    }else{
                        return this.forecasts.filter(item => {
                            return item.locationName == this.input.type
                        } )
                    }
                }
            },
            
            mounted() {
                
                    axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-155A0526-DE23-41D4-89D3-A2AB8160C5CB&format=JSON').then(forecasts=> this.forecasts =forecasts.data.cwbopendata.dataset.location);
                  
                       console.log( axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-155A0526-DE23-41D4-89D3-A2AB8160C5CB&format=JSON'));
                                                            
            },

        });
       