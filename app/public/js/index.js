Vue.use(VueForm, {
    inputClasses: {
        valid: 'form-control-success',
        invalid: 'form-control-danger'
    }
});

new Vue({
    el: '#app',
    data: {
        formstate: {},
        model: {
            name: '',
            lastName: '',
            dni: '',
            quantityRenault: 0,
            quantityChevrolet: 0,
            quantityFord: 0,
            quantityToyota: 0,
        }
    },
    methods: {
        crearUser: function(){
            axios.get('http://localhost:8080/api/tutorials')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onSubmit: function(e) {
            e.preventDefault(e);
            console.log(this.model);
            //this.crearUser();
            axios.post('http://localhost:8080/api/user',{
                name: this.model.name,
                lastName: this.model.lastName,
                dni: this.model.dni,
                renault: this.model.quantityRenault,
                chevrolet: this.model.quantityChevrolet,
                ford: this.model.quantityFord,
                toyota: this.model.quantityToyota,
            })
                .then(function (response) {
                    console.log("respuesta servidor");
                    alert("su orden ha sido creada y sera entregada en ...");
                    console.log(response);
                })
                .catch(function (error) {
                    console.log("fallo todo"+ error);
                    alert(error.response.data.message);
                })
        }
    }
});
