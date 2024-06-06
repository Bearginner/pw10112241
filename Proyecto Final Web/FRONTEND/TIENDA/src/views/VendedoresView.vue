<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Vendedores
                    <RouterLink to="/vendedores/create" class="btn btn-primary float-end">
                    Agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <th>
                            ID
                        </th>
                        <th>
                            Nombre 
                        </th>
                        <th>
                            Apellido
                        </th>
                        <th>
                            Departamento
                        </th>
                        <th>
                            Acciones
                        </th>
                    </thead>
                        <tbody v-if="vendedores.length > 0">
                            <tr v-for="(vendedor,index) in vendedores" :key="index">
                                <td>{{ vendedor.idvendedor  }}</td>
                                <td>{{ vendedor.nombre  }}</td>
                                <td>{{ vendedor.apellido  }}</td>
                                <td>{{ vendedor.departamentotienda  }}</td>
                                <td>
                                    <RouterLink 
                                        :to="{path: '/vendedores/'+vendedor.idvendedor+'/edit'}" class="btn btn-success">
                                        Editar
                                    </RouterLink>
                                    &nbsp; 
                                    <button class="btn btn-danger" @click="deleteVendedores(vendedor.idvendedor)">
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="9" style="text-align: center;">Sin vendedores</td>
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
        name: "VendedoresView",
        data(){
            return{
                vendedores: [],
            }
        },
        mounted(){
            this.getVendedores();
        },
        methods: {
            getVendedores(){
                axios.get('http://localhost:3000/api/vendedores').then(res=>{
                    this.vendedores = res.data;
                });
            },
            deleteVendedores(idvendedores){
                axios.delete('http://localhost:3000/api/vendedores/'+idvendedores).then(res=>{
                    if(res.data.affectedRows > 0){
                        this.getVendedores();
                    }
                });
            }
        }
    }
</script>