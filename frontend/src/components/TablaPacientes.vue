<template>
  <div>
    <!-- Sección del formulario para agregar pacientes -->
    <section class="form mt-3">
      <form @submit.prevent="crearPaciente" class="text-center">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre:</label>
          <input v-model="nombre" type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre" required>
        </div>
        <div class="mb-3">
          <label for="edad" class="form-label">Edad:</label>
          <input v-model="edad" type="number" class="form-control" id="edad" placeholder="Ingrese la edad" required>
        </div>
        <button type="submit" class="btn btn-success">Añadir Paciente</button>
      </form>
    </section>

    <!-- Sección de visualización y manipulación de datos de pacientes -->
    <section class="data mt-4">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paciente, index) in pacientes" :key="paciente.id">
            <td>{{ paciente.id }}</td>
            <td>
              <!-- Sección de actualización del nombre -->
              <span v-if="formActualizar && idActualizar === index">
                <input v-model="nombreActualizar" type="text" class="form-control">
              </span>
              <!-- Sección de visualización del nombre -->
              <span v-else>
                {{ paciente.nombre }}
              </span>
            </td>
            <td>
              <!-- Sección de actualización de la edad -->
              <span v-if="formActualizar && idActualizar === index">
                <input v-model="edadActualizar" type="text" class="form-control">
              </span>
              <!-- Sección de visualización de la edad -->
              <span v-else>
                {{ paciente.edad }}
              </span>
            </td>
            <td>
              <!-- Sección de botones de acciones -->
              <span v-if="formActualizar && idActualizar === index">
                <!-- Botón para guardar la actualización -->
                <button @click="guardarActualizacion(paciente.id)" class="btn btn-info btn-sm">
                  Guardar
                </button>
              </span>
              <span v-else>
                <!-- Botón para activar el formulario de actualización -->
                <button @click="verFormActualizar(index)" class="btn btn-warning btn-sm">
                  Actualizar
                </button>
                <!-- Botón para borrar paciente con confirmación -->
                <button @click="borrarPaciente(paciente.id)" class="btn btn-danger btn-sm" @confirm="confirmarBorrado">
                  Borrar
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: '',
      edad: '',
      formActualizar: false,
      idActualizar: -1,
      nombreActualizar: '',
      edadActualizar: '',
      pacientes: []
    };
  },
  methods: {
    async cargarPacientes() {
      try {
        const response = await axios.get('http://localhost:3000/pacientes');
        this.pacientes = response.data;
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
      }
    },
    async crearPaciente() {
      try {
        await axios.post('http://localhost:3000/pacientes', { nombre: this.nombre, edad: this.edad });
        this.cargarPacientes();
        this.nombre = '';
        this.edad = '';
        // Mensaje descriptivo de Bootstrap para añadir paciente
        this.mostrarMensajeDescriptivo('Paciente añadido exitosamente', 'success');
      } catch (error) {
        console.error('Error al crear paciente:', error);
        // Mensaje descriptivo de Bootstrap para error al añadir paciente
        this.mostrarMensajeDescriptivo('Error al añadir paciente', 'danger');
      }
    },
    verFormActualizar(index) {
      this.idActualizar = index;
      this.nombreActualizar = this.pacientes[index].nombre;
      this.edadActualizar = this.pacientes[index].edad;
      this.formActualizar = true;
    },
    async borrarPaciente(pacienteId) {
      try {
        // Implementa confirmación antes de borrar al paciente
        const confirmacion = window.confirm("¿Estás seguro de que deseas borrar a este paciente?");
        if (confirmacion) {
          await axios.delete(`http://localhost:3000/pacientes/${pacienteId}`);
          this.cargarPacientes();
          // Mensaje descriptivo de Bootstrap para eliminar paciente
          this.mostrarMensajeDescriptivo('Paciente eliminado exitosamente', 'success');
        }
      } catch (error) {
        console.error('Error al borrar paciente:', error);
        // Mensaje descriptivo de Bootstrap para error al eliminar paciente
        this.mostrarMensajeDescriptivo('Error al eliminar paciente', 'danger');
      }
    },
    async guardarActualizacion(pacienteId) {
      this.formActualizar = false;
      try {
        await axios.put(`http://localhost:3000/pacientes/${pacienteId}`, {
          nombre: this.nombreActualizar,
          edad: this.edadActualizar
        });
        this.cargarPacientes();
        // Mensaje descriptivo de Bootstrap para actualizar paciente
        this.mostrarMensajeDescriptivo('Paciente actualizado exitosamente', 'success');
      } catch (error) {
        console.error('Error al actualizar paciente:', error);
        // Mensaje descriptivo de Bootstrap para error al actualizar paciente
        this.mostrarMensajeDescriptivo('Error al actualizar paciente', 'danger');
      }
    },
    // Método para confirmar el borrado
    confirmarBorrado() {
      // Implementa una advertencia antes de borrar al paciente
      return window.confirm("¡Atención! Al borrar al paciente, se perderán todos sus datos de forma permanente. ¿Estás seguro de continuar?");
    },
    // Método para mostrar mensajes descriptivos de Bootstrap
    mostrarMensajeDescriptivo(mensaje, tipo) {
      const mensajeDescriptivo = document.createElement('div');
      mensajeDescriptivo.className = `alert alert-${tipo} mt-3`;
      mensajeDescriptivo.textContent = mensaje;
      document.body.appendChild(mensajeDescriptivo);
      setTimeout(() => {
        mensajeDescriptivo.remove();
      }, 3000);
    }
  },
  mounted() {
    this.cargarPacientes();
  }
};
</script>

<style scoped>
/* Agrega estilos según sea necesario */
</style>
