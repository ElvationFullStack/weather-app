class Render{
constructor(){
this.container_element=$('#container');
this.source=$("#weather-template").html();
this.template=Handlebars.compile(this.source)
}

renderData=function(cities){
    this.container_element.html('');
    const newHTML=this.template({cities});
    this.container_element.append(newHTML);
}



}