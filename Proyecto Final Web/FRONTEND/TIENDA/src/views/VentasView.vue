<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Registrar Venta</h4>
        <div v-if="mensaje == 1" class="alert alert-success" role="alert">
          Venta guardada con éxito
        </div>
      </div>
      <div class="card-body">
        <Form :validation-schema="validationSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label for="clavearticulo">Clave del Artículo</label>
            <Field name="clavearticulo" id="clavearticulo" class="form-control" type="number"
              v-model="Ventas.clavearticulo" />
            <ErrorMessage name="clavearticulo" class="errorValidation" />
          </div>
          <div class="mb-3">
            <label for="cantidad">Cantidad</label>
            <Field name="cantidad" id="cantidad" class="form-control" type="number" v-model="Ventas.cantidad" />
            <ErrorMessage name="cantidad" class="errorValidation" />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Guardar Venta</button>
          </div>
        </Form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        <h4>Ventas</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Clave Artículo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th>ID Vendedor</th>
            </tr>
          </thead>
          <tbody v-if="Ventas.length > 0">
            <tr v-for="(Ventas, index) in Ventas" :key="index">
              <td>{{ Ventas.clavearticulo }}</td>
              <td>{{ Ventas.cantidad }}</td>
              <td>{{ Ventas.precio }}</td>
              <td>{{ Ventas.fecha }}</td>
              <td>{{ Ventas.idvendedor }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" style="text-align: center;">Sin Ventas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export default {
  name: "VentasView",
  components: { Field, Form, ErrorMessage },
  data() {
    const validationSchema = toTypedSchema(
      zod.object({
        clavearticulo: zod.number().nonnegative({ message: 'Solo números enteros no negativos' }),
        cantidad: zod.number().positive({ message: 'Debe ser un número positivo' }),
      })
    );

    return {
      validationSchema,
      mensaje: 0,
      Articulos: {
        clavearticulo: 0,
        descripcion: '',
        existencia: 0,
        precio: 0
      },
      Ventas: {
        clavearticulo: '',
        cantidad: '',
        precio: 0,
        total: 0,
        idvendedor: 0,
      }
    }
  },
  mounted() {
    this.getVentas();
  },
  methods: {
    getArticulo(articuloID) {
      axios.get('http://localhost:3000/api/Articulos/' + articuloID).then(res => {
        this.Articulos = res.data[0];
      })
    },
    onTodoBien() {
      this.calcularPrecio();
      this.guardarVenta();
    },
    calcularPrecio() {
      const claveart = document.getElementById('clavearticulo').value;
      const cantidad = document.getElementById('cantidad').value;
      this.getArticulo(claveart);
      this.Ventas.precio = this.Articulos.precio * cantidad;
    },
    guardarVenta() {
      const ventaData = {
        clavearticulo: this.Ventas.clavearticulo,
        cantidad: this.Ventas.cantidad,
        precio: this.Ventas.precio,
        fecha: new Date().toISOString().split('T')[0],
        idvendedor: 1
      };

      axios.post('http://localhost:3000/api/Ventas', ventaData)
        .then(res => {
          if (res.data.affectedRows > 0) {
            this.Ventas = {
              clavearticulo: '',
              cantidad: '',
              precio: 0,
              total: 0
            };
            this.mensaje = 1;
            this.getVentas();
          }
        })
        .catch(error => {
          console.error('Error saving sale:', error);
        });
    },
    getVentas() {
      axios.get('http://localhost:3000/api/ventas')
        .then(res => {
          this.Ventas = res.data;
        })
        .catch(error => {
          console.error('Error fetching sales:', error);
        });
    }
  }
}
</script>


<style scoped>
.errorValidation {
  color: red;
  font-weight: bold;
}
</style>
