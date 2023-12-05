import { expect, page } from '@playwright/test';

export class MedidasAntropometricas2{

    constructor( page ){
        this.page = page
        this.encabezado = ("//h4[text()='Medidas Antropométricas']")
        this.peso = ("(//label[text()='Peso']/following::input)[1]")
        this.talla = ("(//label[text()='Talla']/following::input)[1]")
        this.imc = ("(//label[text()='IMC']/following::input)[1]")
        this.clasificacion = ("((//label[text()='Clasificación'])[3]/following::input)[1]")
        /* ("((//label[text()='Clasificación'])[2]/following::input)[1]") */
        this.labelPeso = ("(//label[@for='Peso'])[1]")
        this.labelPerimetroAbdominal = ("(//label[@for='Perímetro abdominal'])[1]")
        this.labelTalla = ("//label[@for='Talla']")
        this.labelIMC = ("//label[@for='IMC']")
        this.labelClasificacion = ("(//label[@for='Clasificación'])[2]")

        this.perimetroAbdominal = ("(//label[text()='Perímetro abdominal']/following::input)[1]")
        this.btnArrowColapse = ("(//i[contains(@class,'arrowTitle ng-scope')])[3]")
    }
        
    async validaEncabezadoSeccion() {

        const btnColpasaExamenFisico = this.page.locator(this.btnArrowColapse)
        
        if( await btnColpasaExamenFisico.isVisible() ){
            await btnColpasaExamenFisico.click()
        }
        
            await this.page.waitForSelector(this.encabezado)        
            const encabezado = await this.page.locator(this.encabezado).isVisible()
            if( encabezado ){
                const msj = await this.page.locator(this.encabezado).textContent()
                console.log('Finaliza la seccion: ' + msj.toUpperCase());
                console.log("")
            }else{
                throw new Error ('No existe seccion Medidas Antropometricas');     
            }
    
        
    }

    async inputPeso( valor ) {
        const labelPeso = await this.page.locator(this.labelPeso)
        await expect( labelPeso ).toHaveText("Peso  *  ")
        
        await this.page.locator(this.peso).fill( valor )
        const pesoValue = await this.page.locator(this.peso).inputValue()
        console.log('Peso = ', await pesoValue)
    }

    async inputTalla( valor ){
        const labelTalla = await this.page.locator(this.labelTalla)
        await expect( labelTalla ).toHaveText('Talla  *  ')

        await this.page.locator(this.talla).fill( valor )
        const tallaValue = await this.page.locator(this.talla).inputValue()
        console.log('Talla = ', tallaValue)
    }
   
    async inputIMC(){
        const label = await this.page.locator(this.labelIMC).textContent()

        const labelIMC = await this.page.locator(this.labelIMC)
        await expect( labelIMC ).toHaveText('IMC  *  ')

        const imcValue = await this.page.locator(this.imc).inputValue()
        console.log('IMC = ', imcValue)
    }

    async inputClasificacion(){
        const labelClasificacion = await this.page.locator(this.labelClasificacion)
        await expect( labelClasificacion ).toHaveText('Clasificación  *  ')

        const clasificacionValue = await this.page.locator(this.clasificacion).inputValue()
        console.log('Clasificación = ', clasificacionValue)
    }

    async inputPerimetroAbdominal( valor ){
        const labelPerimetroAbdominal = await this.page.locator(this.labelPerimetroAbdominal)
        await expect( labelPerimetroAbdominal ).toHaveText('Perímetro abdominal  *  ')

        await this.page.locator(this.perimetroAbdominal).fill( valor )
        const perimetroValue = await this.page.locator(this.perimetroAbdominal).inputValue()
        console.log('Perímetro abdominal = ', perimetroValue)

        console.log("")
        console.log("------------------------------------------------------------------")
        console.log("")
    }
}

