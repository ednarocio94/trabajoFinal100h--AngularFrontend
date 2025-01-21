// 1. Realizar las importaciones necesarias 
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// importar el proveedor para hacer peticiones HTTP
import { provideHttpClient } from "@angular/common/http";
// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACIONES CON MIS PETICIONES HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// 2. 
describe(' probando el servicio login', () => {
  let Service: LoginService;
  let httpMock: HttpTestingController;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let apiUrl = "http://localhost:3000/loginUser";
  let apiUrl2 = 'http://localhost:3000/loginAdmin';
  const emailTest = "Anastasia@gmail.com";
  const passwordTest = "123";
  const tokenTest = "kfldshf8ewr83dh";

  beforeEach(() => {
    mockToastrService = jasmine.createSpyObj("ToastrService",["info"]);
    mockRouter = jasmine.createSpyObj("Router",["navigate"]);
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
      
       {provide: ToastrService, useValue: mockToastrService},
       {provide: Router, useValue:mockRouter}
      ]

    });
    Service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // 
  });

  afterAll(() => {
    httpMock.verify(); //después de TODAS las pruebas, no queden peticiones pendientes
  });

  // creando casos de prueba 
  // prueba 1
  it ("Deberia hacer una petición POST para iniciar sesión como admin",()=> {
    const mockRespusta = {
      mensaje: " Inicio de sesión admin exitoso",
      token: tokenTest
    };

    const mockCredenciales = {
      emailLogin: emailTest,
      passwordLogin: passwordTest,
    }
                                                 // subscribe activa las peticiones http y significa que estamos probando 
    Service.inicioSesionAdmin(mockCredenciales). subscribe(
       (res)=> {
           expect(res).toEqual(mockRespusta);
           // el toBe espera datos exactos como 5 o o 
    }
   )
   // yo quiero garantizar que la peticion esta haciendo la url en particular 
   const peticion = httpMock.expectOne(apiUrl2)
         // garantizar el metodo 
         expect(peticion.request.method).toBe("POST")
   
       // esto es lo que simula el servidor 
       peticion.flush(mockRespusta)
   });





});