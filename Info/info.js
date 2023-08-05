
const cuurentIp=document.getElementById('currentIp').innerText;
// const city= document.getElementById('city');
// const region=document.getElementById('region');
// const latitude=document.getElementById('lat');
// const longtitude=document.getElementById('long');
// const organisation=document.getElementById('org');
// const timeZone=document.getElementById('time-zone');
let poContainer=document.getElementById('poContainer');
let searchBtn=document.getElementById('searchPoInput');
let result1;
const about=document.getElementById('about');
    async function loadIp(){
        const endpoint = `https://ipinfo.io/${cuurentIp}/geo?token=98a259f6ea6150`;
       try{
        const res=await fetch(endpoint);
         const result= await res.json();
         result1=result;
        // console.log(result1);
        // seperating lat and log 
        let loc=result.loc.split(',');

        let latitude=loc[0];
        let longtitude=loc[1];
        //attaching all values
        let city=result.city;
        let region=result.region;

        let organisation=result.org;
        let timeZone=result.timezone;
        
        // appending element dynemically
        let newDiv=document.createElement('div');
        newDiv.className='ipDetails';
        newDiv.id='ipDetails';
        newDiv.innerHTML=`<div class="ipDetails" id="ipDetails">
        <section class="ipDetailsSection">
            <p>Lat: <span id="lat">${latitude}</span></p>
            <p>Long: <span id="long">${longtitude}</span></p>
            
        </section>
        <section class="ipDetailsSection">
            <p>City: <span id="city">${city}</span></p>
            <p>Region: <span id="region">${region}</span></p>
            
        </section>

        <section class="ipDetailsSection">
            <p>Organisation: <span id="org">${organisation}</span></p>
            <p>Time Zone: <span id="time-zone">${timeZone}</span></p>
        </section>
    </div>`;
          about.appendChild(newDiv);
          updateGoogleMap(latitude,longtitude);
          result1=result;
          return result;
       }
       catch(error){
          console.log(error);
       }
       
     };
     loadIp().then(()=>{
        //updating more info section
        let time_Zone=document.getElementById('time_Zone');
        let dateAndTime=document.getElementById('date-time');
        let pincode=document.getElementById('pincode');
        let timeZone=result1.timezone;
        let datetime_str = new Date().toLocaleString("en-US", { timeZone: timeZone });
        time_Zone.innerHTML=timeZone;
        dateAndTime.innerHTML=datetime_str;
        pincode.innerHTML=result1.postal;
     }).then(()=>{
        let pin=pincode.innerText;
       let url = `https://api.postalpincode.in/pincode/${pin}`;
       async function findNumberOfPO(){
        try{
            let count = await fetch(url);
        let countPo= await count.json();
         return countPo;
        }
        catch(err){
            console.log(err);
        }
       }
        let countPo=findNumberOfPO().then((countPo) =>{
            let totalPO=countPo[0].PostOffice.length;
            let count=document.getElementById('pincode-count');
            count.innerHTML=totalPO;
            // now rendering all po details
            let poArray=countPo[0].PostOffice;
           
            for(let i=0 ; i<poArray.length ; i++){
                let po = poArray[i];
                let name=po.Name;
                let branchType=po.BranchType;
                let deliverStatus=po.DeliveryStatus;
                let district=po.District;
                let division=po.Division;
                //now adding to container
                let newElement=document.createElement('div');
                newElement.className='poDetails';
                newElement.innerHTML=`
                <h4>Name : <span id="poName">${name}</span></h4>
                <h4>Branch Type : <span id="branchType">${branchType}</span></h4>
                <h4>Delivery Status : <span id="deliveryStatus">${deliverStatus}</span></h4>
                <h4>District : <span id="district">${district}</span></h4>
                <h4>Division : <span id="division">${division}</span></h4>
                `;
                poContainer.appendChild(newElement);
            }
            // searchBtn.addEventListener('keyup',(eve)=>{
            //     let str=eve.target.value.toLowerCase();
            //     for(let i=0 ; i<poArray.length ; i++){
            //         let po = poArray[i];
            //         let name=po.Name.toLowerCase();
            //         let branchType=po.BranchType.toLowerCase();
            //         let deliverStatus=po.DeliveryStatus;
            //         let district=po.District;
            //         let division=po.Division;
            //         if(name.includes(str) || branchType.includes(str)){
            //             console.log(name,branchType);
            //             //now adding to container
            //             // poContainer.innerHTML='';
            //          let newElement=document.createElement('div');
            //           newElement.className='poDetails';
            //           newElement.innerHTML=`
            //         // <h4>Name : <span id="poName">${name}</span></h4>
            //         // <h4>Branch Type : <span id="branchType">${branchType}</span></h4>
            //         // <h4>Delivery Status : <span id="deliveryStatus">${deliverStatus}</span></h4>
            //         // <h4>District : <span id="district">${district}</span></h4>
            //         // <h4>Division : <span id="division">${division}</span></h4>
            //         // `;
            //          poContainer.appendChild(newElement);
            //         }
                    
            //     }
            // })
        });
       
     });
     // updating google map
     // let long=document.getElementById('long');
     // let lat=document.getElementById('lat');
     // let elem=document.getElementById('ipDetails');
     // const googleMap=document.getElementById('googleMap');


     const googleMap=document.getElementById('googleMap');
     function updateGoogleMap(lat,long){
      let latitude=lat;
      let longtitude = long;
     let iFrame=document.getElementsByTagName('iframe')[0];
      let srcLink= `https://maps.google.com/maps?q=${latitude}, ${longtitude}&z=15&output=embed`;
      iFrame.src=srcLink;
      iFrame.style.width="100%"; 
      iFrame.style.height="100%" ;   
     }

    
     
   