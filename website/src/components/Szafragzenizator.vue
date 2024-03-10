<template>
    <div class="page">
        <h1 class="title">Szafrajzenizator</h1>
        <hr/>
        <div class="menu">
            <input
                class="inputClass"
                v-model="name"
                @input="displayNewName = false"
            />
            <button
            class="button-5"
            @click="test"
            >
                Valider
            </button>
        </div>
        <p 
            v-show="displayError"
            class="error"
        >
            Veuillez entrer un nom valide
        </p>
        <div 
            class="menu"
            v-show="displayNewName"
        >
            <h2>Votre nouveau nom est : </h2> 
            <p class="newName">{{ newName }}</p>
        </div>
        <hr/>
        <h2 class="subTitle">Toi aussi fait partie de la famille</h2>
        <div
            class="list" 
            v-for="d in data" :key="d.id"
        >
            <p class="name">{{d.names}}</p>
            <p class="date">{{d.date}}</p>
        </div>
    </div>
</template>
<script>
//import { connectSQlite } from '@/db/openDb';
export default {
    name: 'Szafragzenizator',
    data(){
        return{
            name: "",
            data: [],
            displayError: false,
            newName: "",
            displayNewName: false
        }
    },
    mounted(){
        this.refreshData();
    },
    methods:{
        test(){
            if(this.verifyInput())
                this.szafragzenization()
        },

        async szafragzenization(){
            let bufName = ""

            for(let i = 0; i < this.name.length-1 ; i++){
                bufName += this.name[i]
                if(this.checkLetter(this.name[i],this.name[i+1])){
                    if(this.name[i].toUpperCase() === this.name[i] && this.name[i+1].toUpperCase() === this.name[i+1])
                        bufName += 'Z'
                    else
                        bufName += 'z'
                }
                   
            }
            bufName += this.name[this.name.length-1]
            
            bufName = this.cleanName(bufName)
            
            let newObj = {
                    names:bufName,
                    date:this.getDate()
                }

            const reponse = await fetch("https://szafrajzenizator.onrender.com/names", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newObj),
            });
            this.newName = bufName
            this.displayNewName = true;
            await this.refreshData()
        },

        cleanName(bufName){
            bufName = bufName.replaceAll("'","")
            bufName = bufName.replaceAll(" ","")
            bufName = bufName.replaceAll("`","")
            bufName = bufName.replaceAll("$","")
            bufName = bufName.replaceAll("\"","")
            return bufName
        },

        checkLetter(i, y){
            let voyelle = ['a','e','i','o','u']
            let consonne = ['b','p','t','j','g','s','c']
            
            if( (consonne.includes(i.toLowerCase()) && voyelle.includes(y.toLowerCase())) || ( i.toLowerCase() == 'c' && y.toLowerCase() == 'h' )  )
                return true
        },

        verifyInput(){
            if(this.name.length < 3 || this.name.length > 30){
                this.displayError = true
                return false
            }
            else{
                this.displayError = false
                return true
            }
        },

        getDate(){
            let date = new Date()
            return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + '/' + date.toISOString().slice(5,7) + '/' + date.getUTCFullYear()
        },

        async refreshData(){
            let response = await fetch("https://szafrajzenizator.onrender.com/names")
            response = await response.json()
            this.data = response
            console.log(response)
        }
    }
}
</script>
<style scoped>
@import '@/assets/button-5.css';

.page{
    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.title{
    text-align: center;
    margin:50px;
    
}
.menu{
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputClass{
    display: inline-block;
    height:30px;
    width:20em;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    font-size: 16px;
    
}
.list{
    display: grid;
    grid-template-columns: minmax(10em,80em) auto;
    margin-left:20%;
    margin-right: 20%;
}
.date{
    font-style: italic;
    color:gray;
}
.error{
    color:red;
}
.subTitle{
    margin-left:5%;
    margin-right: 5%;
}
.newName{
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 7px;
    margin-inline-end: 0px;
}

</style>
