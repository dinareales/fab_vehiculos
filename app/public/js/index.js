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
            quantityRenault: '',
            quantityChevrolet: '',
            quantityFord: '',
            quantityToyota: '',
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
                dni: this.model.dni
            })
                .then(function (response) {
                    console.log("respuesta servidor");
                    console.log(response);
                })
                .catch(function (error) {
                    console.log("fallo todo"+ error);
                })
        }
    }
});
