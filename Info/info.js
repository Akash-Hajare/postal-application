
const cuurentIp=document.getElementById('currentIp').innerText;
// const city= document.getElementById('city');
// const region=document.getElementById('region');
// const latitude=document.getElementById('lat');
// const longtitude=document.getElementById('long');
// const organisation=document.getElementById('org');
// const timeZone=document.getElementById('time-zone');
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
            console.log(countPo[0].PostOffice[7])
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

    
     
    //  function xyz(){
    //     let x=10;
    //     ans=x;
    //  }
    //  xyz();
    //  console.log(ans);
     