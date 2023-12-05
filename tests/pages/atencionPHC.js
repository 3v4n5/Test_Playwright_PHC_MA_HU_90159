import { page } from '@playwright/test';

exports.AtencionPHC = class AtencionPHC {

    constructor( page ){
        this.page = page;
        this.abrirBuscar = ('#btnOpenFinder')
        this.inputPaciente = ('input[name="identificacion"]')
        this.btnBuscar = ('//button[normalize-space()="Buscar paciente"]')
        this.btnAtender = ('//*[@id="tblPatients"]/tbody/tr[2]/td[4]/span[2]/img')
                                    
        this.seleccionarAtencion = ("//input[@placeholder='Escribe para filtrar las atenciones...']")
        /* '//*[@id="ng-app"]/div[3]/div/div/span/div[1]/table/tbody/tr[3]/td[2]/select' */
                                    
                                    
        this.seleccionarPlan = '//*[@id="ng-app"]/div[3]/div/div/span/div[1]/table/tbody/tr[4]/td[2]/select'
        
        this.btnIniciarAtencion = ('//*[@id="ng-app"]/div[3]/div/div/span/div[3]/div/button[2]')
        this.btnIniciarRegistro = ("//button[contains(@class,'badge buttonGeneral')]")
        this.btnAceptarRemision = ("//button[@class='buttonMainAction ng-binding']")
        this.btnAbrirRemisiones = ("(//button[@class='buttonExpand btn'])[1]")
        this.btnSinRemision = ("//img[@title='Atender sin remisión']")
        this.btnAceptarSinRemision = ("//button[@ng-if='messageButtonVisible']")
        this.btnSinDerechos = ("//button[@class='buttonMainAction ng-binding']")
        this.btnConsentInform = ("//button[text()='Aceptar']")

        this.seleccionarAtencionP = ("//input[@placeholder='Escribe para filtrar las atenciones...']")
        this.btnAtenderP = "//img[@title='Atender']"
    }


    async iniciarNuevaAtencion( cedula ) {
        await this.page.locator(this.abrirBuscar).click()
        await this.page.locator(this.inputPaciente).fill( cedula )
        await this.page.locator(this.btnBuscar).click()
        await this.page.locator(this.btnAtender).click()  
    }
    
    async iniciarNuevaAtencionP( cedula ) {
        await this.page.locator(this.abrirBuscar).click()
        await this.page.locator(this.inputPaciente).fill( cedula )
        await this.page.locator(this.btnBuscar).click()
        await this.page.waitForSelector(this.btnAtenderP)
        await this.page.locator(this.btnAtenderP).click()  
    }

    async seleccionarTipoAtencion( atencion ){
        await this.page.locator(this.seleccionarAtencion).click()
        const valorImprimir = this.page.getByText( atencion, {exact: true} ).textContent()
        await this.page.getByText( atencion, {exact: true} ).click()
        

        console.log('')
        console.log( await valorImprimir )
        console.log('------------------------------------------------------------------')
        console.log('')
    }
    
    // async seleccionarTipoAtencionP( atencion ){
    //     await this.page.getByPlaceholder('Escribe para filtrar las atenciones...').click();
    //     const valorImprimir = await this.page.getByText( atencion, {exact: true} ).textContent()
    //     await this.page.getByText( atencion ).click();
    //     // await this.page.locator(this.seleccionarAtencionP).click()
    //     //const Seleccionar = await this.page.getByText( atencion , { exact: true })
        
    //     console.log('')
    //     console.log( await valorImprimir )
    //     console.log('------------------------------------------------------------------')
    //     console.log('')
    // }

    async seleccionarTipoPlan( plan ){
        await this.page.locator(this.seleccionarPlan).selectOption({ value: plan})
        await this.page.locator(this.btnIniciarAtencion).click()
        
        const botonCI = this.page.locator(this.btnConsentInform)
       
        if( await botonCI.isVisible() ){
            await botonCI.click()
        }
           await this.page.locator(this.btnIniciarRegistro).click()
        
        
        await this.page.screenshot({ path: 'tests/Screenshots/Atencion/' + 'Atencion.png' });
    }


    async btnVisibleEspecialidad(){
        const botones =[
            this.btnAceptarRemision,
            this.btnAbrirRemisiones,
            this.btnSinRemision,
            this.btnAceptarSinRemision,
            this.btnSinDerechos,
        ]

        for( const selector of botones ){
            const boton = await this.page.locator(selector)
            
            if(await boton.isVisible()){
               await boton.click()
            }
        }
    } 


} 