function Post(){
    console.log('POST');
    fetch('http://localhost:5000/api/db',{
        method: 'POST', mode: 'no-cors',
        headers:{ 'Content-Type': 'application/json', 'Accept':'application/json'},
        body: JSON.stringify({id:ID.value, name: Name.value, bday:Bday.value })
    })
        .then(response=>{return response.json();})
        .then((pdata)=>{console.log('POST.pdata', pdata);});
}