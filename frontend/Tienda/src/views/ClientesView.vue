<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4> Clientes
                    <RouterLink to=/clientes/create class="btn btn-primary float-end">
                        Agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <th> ID</th>
                        <th> Nombre </th>
                        <!-- <th> Apellidos </th> -->
                        <th> Direccion </th>
                        <th> Telefono </th>
                        <th> RFC </th>
                       <!--  <th> CURP </th>
                        <th> CP </th> -->
                        <th> Acciones</th>
                    </thead>
                    <tbody v-if="clientes.length > 0">
                        <tr v-for="(cliente, index) in clientes" :key="index">
                            <td> {{ cliente.id }}</td>
                            <td> {{ cliente.nombre }}</td>
                            <!-- <td> {{ cliente.apellido }}</td> -->
                            <td> {{ cliente.direccion }}</td>
                            <td> {{ cliente.telefono }}</td>
                            <td> {{ cliente.rfc }}</td>
                            <!-- <td> {{ cliente.curp }}</td>
                            <td> {{ cliente.cp }}</td> -->
                            <td> 
                                <RouterLink :to="{path: '/clientes/' + cliente.id + '/edit'}" class="btn btn-success">
                                Editar 
                            </RouterLink>
                                &nbsp; 
                                <buttton class="btn btn-danger" @click="deleteCliente(cliente.id)"> Borrar</buttton>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6" style="text-align: center;"> Clientesn't </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
export default {
    name: "ClientesView",
    data() {
        return {
            clientes: [],
        }
    },
    mounted(){ //Cuando se recarga la pagina
        this.getClientes();
    },
    methods: {
        getClientes() {
            axios.get('http://localhost:3000/api/clientes').then(res=>{
                this.clientes = res.data;
            });
        }, 
        deleteCliente(iddelclienteaborrar){
            axios.delete('http://localhost:3000/api/clientes/'+iddelclienteaborrar).then(res=>{
                if(res.data.affectedRows > 0){
                    this.getClientes(); //Se recarguen los datos
                }
            });
        }

    }
}
</script>