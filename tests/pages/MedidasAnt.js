import { expect } from '@playwright/test'

export class MedidasAntropometricas {
    //await page.locator("(//label[text()='Peso']/following::input)[1]").click();
    constructor(page) {
        this.page = page;
        this.encabezado = ("//h4[text()='Medidas Antropométricas']")
        this.peso = ("(//label[text()='Peso']/following::input)[1]")
        this.perimetroAbdominal = ("(//label[text()='Perímetro abdominal']/following::input)[1]")
        this.alturaRodilla = ("(//label[text()='Altura de rodilla']/following::input)[1]")
        this.tallacalculadaAR = ("(//label[text()='Talla calculada por AR']/following::input)[1]")
        this.IMCcalculadoAR = ("(//label[text()='IMC calculada por AR']/following::input)[1]")
        this.cl_IMCporAR = ("(//label[text()='Clasificación IMC por AR']/following::input)[1]")
        this.perimetroBraquial = ("(//label[text()='Perímetro braquial']/following::input)[1]")
        this.int_perimetroBraquial = ("(//label[text()='Interpretación perímetro braquial']/following::input)[1]")
        this.circunferenciaPantorilla = ("(//label[text()='Circunferencia pantorrilla']/following::input)[1]")
        this.int_circunferenciaPantorilla = ("(//label[text()='Interpretación circunferencia de pantorrilla']/following::input)[1]")
        this.velocidadMarcha = ("(//label[text()='Velocidad marcha']/following::input)[1]")
        this.int_VelocidadMarcha = ("(//label[text()='Interpretación velocidad de la marcha']/following::input)[1]")
        this. btnArrowColapse = ("(//i[contains(@class,'arrowTitle ng-scope')])[3]")
    }

    async validaEncabezadoSeccion() {

        const btnColpasaExamenFisico = await this.page.locator(this.btnArrowColapse)
        
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

    async inputPeso(valor) {
        await this.page.locator(this.peso).fill(valor)
        const pesoValue = await this.page.locator(this.peso).inputValue()
        console.log('Peso =', pesoValue)
    }

    async inputPerimetroAbdominal(valor) {
        await this.page.locator(this.perimetroAbdominal).fill(valor)
        const perimetroValue = await this.page.locator(this.perimetroAbdominal).inputValue()
        console.log('Perímetro abdominal =', perimetroValue)
    }

    async inputAlturaRodilla(valor) {
        await this.page.locator(this.alturaRodilla).fill(valor)
        const aRodillaValue = await this.page.locator(this.alturaRodilla).inputValue()
        console.log('Altura de rodilla =', aRodillaValue)
    }

    async inputTallaCalculadaPorAR(edad, sexo) {
        const talla = await this.page.locator(this.tallacalculadaAR).inputValue()
        const aRodillaValue = await this.page.locator(this.alturaRodilla).inputValue()
        const calculoFCh = (2.02 * parseInt(aRodillaValue)) - (0.04 * edad) + 64.19
        const calculoFCm = (1.83 * parseInt(aRodillaValue)) - (0.24 * edad) + 84.88
        const chumleaH = calculoFCh.toFixed(1)
        const chumleaM = calculoFCm.toFixed(1)

        const sexoFM = sexo;
        
        switch (sexoFM) {
            case 'H':
                if (chumleaH === talla) {
                    console.log('Formula Chumlea OK ', chumleaH)
                } else {
                    console.log('Error en Talla Calculada AR Formula = ', chumleaH)
                }
                console.log('Talla calculada por AR =', talla,)
                
            break;
            
            case 'M':
                if (chumleaM === talla) {
                    console.log('Formula Chumlea OK ', chumleaM)
                } else {
                    console.log('Error en Talla Calculada AR Formula = ', chumleaM)
                }
                console.log('Talla calculada por AR =', talla,)
                
            break;

            default:
                break;
        }
    }

    async inputIMCcalculadaPorAR() {

        const value = await this.page.locator(this.IMCcalculadoAR).inputValue()
        const texto = await this.page.locator(this.cl_IMCporAR)
        if (value < 22) {
            await expect(texto).toHaveValue('Desnutrición')
        } else if (value >= 22.1 && value <= 22.9) {
            await expect(texto).toHaveValue('Delgadez')
        } else if (value >= 23 && value <= 27.9) {
            await expect(texto).toHaveValue('Peso normal')
        } else if (value >= 28 && value <= 31.9) {
            await expect(texto).toHaveValue('Sobrepeso')
        } else if (value >= 32) {
            await expect(texto).toHaveValue('Obesidad')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('IMC calculada por AR.........', value, ' Clasificación IMC por AR =', await texto.inputValue())
    }


    async inputPerimetroBraquial(valor) {
        await this.page.locator(this.perimetroBraquial).fill(valor)
        const value = await this.page.locator(this.perimetroBraquial).inputValue()
        const texto = await this.page.locator(this.int_perimetroBraquial)
        if (value < 22) {
            await expect(texto).toHaveValue('Probable sarcopenia')
        } else if (value >= 22) {
            await expect(texto).toHaveValue('Normal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Perímetro braquial ..........', value, 'Interpretación perímetro braquial =', await texto.inputValue())
    }

    async inputCircunferenciaPantorilla(valor) {
        await this.page.locator(this.circunferenciaPantorilla).fill(valor)
        const value = await this.page.locator(this.circunferenciaPantorilla).inputValue()
        const texto = await this.page.locator(this.int_circunferenciaPantorilla)
        if (value < 31) {
            await expect(texto).toHaveValue('Probable sarcopenia')
        } else if (value >= 31) {
            await expect(texto).toHaveValue('Normal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Circunferencia pantorrilla ..', value, 'Interpretación circunferencia de pantorrilla =', await texto.inputValue()
        )
    }

    async inputVelocidadMarcha(valor) {
        await this.page.locator(this.velocidadMarcha).fill(valor)
        const value = await this.page.locator(this.velocidadMarcha).inputValue()
        const texto = await this.page.locator(this.int_VelocidadMarcha)
        if (value <= 4.8) {
            await expect(texto).toHaveValue('Normal')
        } else if (value > 4.8) {
            await expect(texto).toHaveValue('Alterado')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log('Velocidad marcha ............', value, ' Interpretación velocidad de la marcha =', await texto.inputValue()
        )

        await this.page.screenshot({ path: 'tests/Screenshots/SeccionMA/' + 'Medidas.png' });

        console.log("")
        console.log("------------------------------------------------------------------")
        console.log("")
    }

}

