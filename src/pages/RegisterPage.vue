<script setup lang="ts">
   import { reactive } from 'vue'
   import { generarClienteAleatorio } from '../utils'
import { generarDocumentoAleatorio } from '../utils/generarDatos';

   // interfaces
   interface Cliente {
      id?: string
      nombres: string
      apellidos: string
      correo: string
      nroDocumento: string
      imagen?: File
   }

   interface Documento {
      id?: string
      codigo: string
      descripcion: string
      archivo?: File
   }

   interface Database {
      id?: string
      nombres: string
      apellidos: string
      correo: string
      nroDocumento: string
      imagen?: File
      documentos: Documento[]
   }

   // reactivos
   const cliente: Cliente = reactive({
      nombres: '',
      apellidos: '',
      correo: '',
      nroDocumento: '',
   })

   const documento: Documento = reactive({
      codigo: '',
      descripcion: '',
   })

   const documentos: Documento[] = reactive([])

   const database: Database[] = reactive([])

   const errors = reactive({
      nombres: '',
      apellidos: '',
      correo: '',
      nroDocumento: '',
      codigo: '',
      descripcion: '',
   })

   // funciones
   const resetDocumento = () => {
      documento.codigo = ''
      documento.descripcion = ''
   }

   const resetCliente = () => {
      cliente.nombres = ''
      cliente.apellidos = ''
      cliente.correo = ''
      cliente.nroDocumento = ''
   }

   const resetDocumentList = () => {
      documentos.length = 0
   }

   const cleanErrors = () => {
      errors.nombres = ''
      errors.apellidos = ''
      errors.correo = ''
      errors.nroDocumento = ''
      errors.codigo = ''
      errors.descripcion = ''
   }

   const checkDocumentoErrors = () => {
      cleanErrors()
      let countErrors = 0

      if (documento.codigo.trim() === '') {
         errors.codigo = 'Campo obligatorio'
         countErrors++
      }
      if (documento.descripcion.trim() === '') {
         errors.descripcion = 'Campo obligatorio'
         countErrors++
      }

      if (countErrors > 0) return true
      else return false
   }

   const checkClienteErrors = () => {
      cleanErrors()
      let countErrors = 0

      if (cliente.nombres.trim() === '') {
         errors.nombres = 'Campo obligatorio'
         countErrors++
      }

      if (cliente.apellidos.trim() === '') {
         errors.apellidos = 'Campo obligatorio'
         countErrors++
      }

      if (cliente.correo.trim() === '') {
         errors.correo = 'Campo obligatorio'
         countErrors++
      }

      if (cliente.nroDocumento.trim() === '') {
         errors.nroDocumento = 'Campo obligatorio'
         countErrors++
      }

      if (countErrors > 0) return true
      else return false
   }

   const generarNumeroDocumentoUnico = (): string => {
      const timestamp = Date.now().toString(36).slice(-4) // Últimos 4 caracteres del timestamp en base 36
      const randomPart = Math.random().toString(36).substring(2, 6) // 4 caracteres aleatorios
      return (timestamp + randomPart).toUpperCase() // Combina y convierte en mayúsculas
   }

   const eliminarPorId = (id: string): void => {
      const index = documentos.findIndex((doc) => doc.id === id)
      if (index !== -1) {
         documentos.splice(index, 1) // Elimina el elemento en el índice encontrado
      }
   }

   // metodos
   const agregar = () => {
      const hasErrors = checkDocumentoErrors()

      if (hasErrors) return

      const id = generarNumeroDocumentoUnico()
      documentos.push({ id, ...documento })
      resetDocumento()
   }

   const guardar = () => {
      const hasErrors = checkClienteErrors()

      if (hasErrors) console.log('errores')
      else {
         const id = generarNumeroDocumentoUnico()
         console.log('documentos', [...documentos])
         database.push({ id, ...cliente, documentos: [...documentos] })
         resetCliente()
         resetDocumentList()
         console.log('sin errores')
      }
   }

   const generarCliente = () => {
      const usr = generarClienteAleatorio()
      cliente.nombres = usr.nombres
      cliente.apellidos = usr.apellidos
      cliente.correo = usr.correo
      cliente.nroDocumento = usr.nroDocumento
   }

   const generarDocumento = () => {
      const doc = generarDocumentoAleatorio()
      documento.codigo = doc.codigo
      documento.descripcion = doc.descripcion
   }
</script>

<template>
   <div class="container">
      <div class="row mt-4">
         <div class="col-3">
            <h3>DocApp</h3>
            <hr />
            <div class="mb-3">Bienvenido, Armando</div>

            <div v-for="item in database" :key="item.id" class="row g-3 mb-3">
               <div class="col-auto">
                  <img src="../assets/no-avatar.png" alt="" width="40" style="border-radius: 50%" />
               </div>
               <div class="col" style="font-size: 14px">
                  <span>{{ `${item.nombres} ${item.apellidos}` }}</span
                  ><br />
                  <span><i class="bi bi-filetype-doc"></i> {{ item.documentos.length }} archivos</span>
               </div>
               <div class="col-auto"></div>
            </div>

            <div class="row g-3">
               <div class="col-auto">
                  <img src="../assets/no-avatar.png" alt="" width="40" style="border-radius: 50%" />
               </div>
               <div class="col" style="font-size: 13px">
                  <span>Srmando Morales</span><br />
                  <span>Documentos: 3</span>
               </div>
               <div class="col-auto"></div>
            </div>

            <span>cliente</span>
            <pre style="font-size: 13px">{{ JSON.stringify(cliente, null, 2) }}</pre>
            <span>documento</span>
            <pre style="font-size: 13px">{{ JSON.stringify(documento, null, 2) }}</pre>
            <span>lista de documentos</span>
            <pre style="font-size: 13px">{{ JSON.stringify(documentos, null, 2) }}</pre>
            <span>errores</span>
            <pre style="font-size: 13px">{{ JSON.stringify(errors, null, 2) }}</pre>
            <span>database</span>
            <pre style="font-size: 13px">{{ JSON.stringify(database, null, 2) }}</pre>
         </div>
         <div class="col-9">
            <h3>Registro</h3>
            <hr />
            <div class="card mb-3">
               <div class="card-body">
                  <h5 class="card-title mb-4">Datos del Cliente <i class="bi bi-magic" style="cursor: pointer" @click="generarCliente"></i></h5>
                  <div class="row g-3">
                     <div class="col-auto">
                        <img src="../assets/no-avatar.png" alt="" width="170" style="border-radius: 50%" />
                     </div>
                     <div class="col">
                        <div class="row g-3">
                           <div class="col-6">
                              <div>
                                 <label for="nombres" class="form-label">Nombres</label>
                                 <input v-model="cliente.nombres" type="text" :class="`form-control ${errors.nombres ? 'is-invalid' : ''}`" id="nombres" />
                                 <div class="invalid-feedback">{{ errors.nombres }}</div>
                              </div>
                           </div>
                           <div class="col-6">
                              <div>
                                 <label for="apellidos" class="form-label">Apellidos</label>
                                 <input v-model="cliente.apellidos" type="text" :class="`form-control ${errors.apellidos ? 'is-invalid' : ''}`" id="apellidos" />
                                 <div class="invalid-feedback">{{ errors.apellidos }}</div>
                              </div>
                           </div>
                           <div class="col-6">
                              <div>
                                 <label for="correo" class="form-label">Correo Electrónico</label>
                                 <input v-model="cliente.correo" type="text" :class="`form-control ${errors.correo ? 'is-invalid' : ''}`" id="correo" />
                                 <div class="invalid-feedback">{{ errors.correo }}</div>
                              </div>
                           </div>
                           <div class="col-6">
                              <div>
                                 <label for="dni" class="form-label">N° DNI</label>
                                 <input v-model="cliente.nroDocumento" type="text" :class="`form-control ${errors.nroDocumento ? 'is-invalid' : ''}`" id="dni" />
                                 <div class="invalid-feedback">{{ errors.nroDocumento }}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="card mb-3">
               <div class="card-body">
                  <h5 class="card-title mb-4">Documentos <i class="bi bi-magic" style="cursor: pointer" @click="generarDocumento"></i></h5>
                  <div class="row g-3 mb-4">
                     <div class="col">
                        <div class="row g-3">
                           <div class="col-4">
                              <div>
                                 <label for="nro_documento" class="form-label">N° Documento</label>
                                 <input v-model="documento.codigo" type="text" :class="`form-control ${errors.codigo ? 'is-invalid' : ''}`" id="nro_documento" />
                                 <div class="invalid-feedback">{{ errors.codigo }}</div>
                              </div>
                           </div>
                           <div class="col-4">
                              <div>
                                 <label for="descripcion" class="form-label">Descripción</label>
                                 <input v-model="documento.descripcion" type="text" :class="`form-control ${errors.descripcion ? 'is-invalid' : ''}`" id="descripcion" />
                                 <div class="invalid-feedback">{{ errors.descripcion }}</div>
                              </div>
                           </div>
                           <div class="col-4">
                              <div>
                                 <label for="archivo" class="form-label">Archivo</label>
                                 <input type="file" class="form-control" id="archivo" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-auto">
                        <div>
                           <label for="archivo" class="form-label">&nbsp;</label><br />
                           <button type="button" class="btn btn-success" @click="agregar">Agregar</button>
                        </div>
                     </div>
                  </div>
                  <table class="table">
                     <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">N° Documento</th>
                           <th scope="col">Descripción</th>
                           <th scope="col">Archivo</th>
                           <th scope="col">Acción</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(doc, index) in documentos" :key="index">
                           <th scope="row">{{ index + 1 }}</th>
                           <td>{{ doc.codigo }}</td>
                           <td>{{ doc.descripcion }}</td>
                           <td>{{ doc.archivo ? doc.archivo : 'Ninguno' }}</td>
                           <td>
                              <button class="btn btn-outline-danger btn-sm" @click="eliminarPorId(doc.id)"><i class="bi bi-x-circle"></i></button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <div class="d-flex justify-content-between">
               <button type="button" class="btn btn-secondary">Resetear</button>
               <button type="button" class="btn btn-primary" @click="guardar">Guardar</button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
