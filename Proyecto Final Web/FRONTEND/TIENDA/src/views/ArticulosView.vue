<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Articulos
                    <RouterLink to="/Articulos/create" class="btn btn-primary float-end">
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
                            Descripcion 
                        </th>
                        <th>
                            Existencia
                        </th>
                        <th>
                            Precio
                        </th>
                        <th>
                            Acciones
                        </th>
                    </thead>
                        <tbody v-if="Articulos.length > 0">
                            <tr v-for="(Articulo,index) in Articulos" :key="index">
                                <td>{{ Articulo.clavearticulo  }}</td>
                                <td>{{ Articulo.descripcion  }}</td>
                                <td>{{ Articulo.existencia  }}</td>
                                <td>{{ Articulo.precio  }}</td>
                                <td>
                                    <RouterLink 
                                        :to="{path: '/Articulos/'+Articulo.clavearticulo+'/edit'}" class="btn btn-success">
                                        Editar
                                    </RouterLink>
                                    &nbsp; 
                                    <button class="btn btn-danger" @click="deleteArticulos(Articulo.clavearticulo)">
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="9" style="text-align: center;">Sin Articulos</td>
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
        name: "ArticulosView",
        data(){
            return{
                Articulos: [],
            }
        },
        mounted(){
            this.getArticulos();
        },
        methods: {
            getArticulos(){
                axios.get('http://localhost:3000/api/Articulos').then(res=>{
                    this.Articulos = res.data;
                });
            },
            deleteArticulos(idArticulos){
                axios.delete('http://localhost:3000/api/Articulos/'+idArticulos).then(res=>{
                    if(res.data.affectedRows > 0){
                        this.getArticulos();
                    }
                });
            }
        }
    }
</script>