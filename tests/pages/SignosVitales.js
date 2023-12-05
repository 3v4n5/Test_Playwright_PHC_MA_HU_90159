import { expect } from '@playwright/test';

export class SignosVitales {

    constructor(page) {
        this.page = page;
        this.encabezado2 = ("(//h4[text()='Signos Vitales'])[1]")
        this.frecuenciaCardiaca = ("(//label[text()='Frecuencia cardiaca']/following::input)[1]")
        this.frecuenciaPulso = ("(//label[text()='Frecuencia Pulso']/following::input)[1]")
           
        this.frecuenciaRespiratoria = ("(//label[text()='Frecuencia respiratoria']/following::input)[1]")
        this.cl_FrecuenciaCardiaca = ("(//label[text()='Clasificación frecuencia cardiaca']/following::input)[1]")
        this.cl_Pulso = ("(//label[text()='Clasificación pulso']/following::input)[1]")
        this.cl_FrecuenciaRespiratoria = ("(//label[text()='Clasificación frecuencia respiratoria']/following::input)[1]")
    }


    async validaEncabezadoSeccion2() {
        // await this.page.locator(this.encabezado2).scrollIntoViewIfNeeded();
        const msj = await this.page.locator(this.encabezado2).textContent()
        console.log('Finaliza la seccion: ' + msj.toUpperCase());
        console.log("")
    }

    async inputFrecuenciaCardiaca(valor) {
        const value = await this.page.locator(this.frecuenciaCardiaca).fill(valor)
    }

    async inputFrecuenciaPulso(valor) {
        await this.page.locator(this.frecuenciaPulso).fill(valor)
    }

    async inputFrecuenciaRespiratoria(valor) {
        await this.page.locator(this.frecuenciaRespiratoria).fill(valor)
    }

    async labelcl_FrecuenciaCardiaca(edad) {
        const value = await this.page.locator(this.frecuenciaCardiaca).inputValue()
        const texto = await this.page.locator(this.cl_FrecuenciaCardiaca)

        const edadpaciente = edad
        switch (edadpaciente) {
            case (edadpaciente < 60):
                if ( value <= 100){
                    expect(texto).toHaveValue('Normal') 
                }else if ( value > 100 ){
                    expect(texto).toHaveValue('Anormal')
                 }

            case (edadpaciente >= 60):
                if (value >= 60 && value <= 90) {
                    expect(texto).toHaveValue('Normal')
                } else if (value <= 60 && value >= 90) {
                    await expect(texto).toHaveValue('Anormal')
                }
                break;

            default: console.log( 'Se debe ingresar un valor valido')
                break;
        }

        console.log(
            'Frecuencia Cardiaca......', value,
            'Clasificación Frecuencia Cardiaca......', await texto.inputValue()
        )
    }

    async labelcl_cl_Pulso() {
        const valueF = await this.page.locator(this.frecuenciaCardiaca).inputValue()
        const value = await this.page.locator(this.frecuenciaPulso).inputValue()
        const texto = await this.page.locator(this.cl_Pulso)

        if (value == valueF) {
            expect(texto).toHaveValue('Normal')
        } else if (value != valueF) {
            await expect(texto).toHaveValue('Alterado')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log(
            'Frecuencia Pulso.........', value,
            ' Clasificación Pulso....................', await texto.inputValue()
        )
    }

    async labelcl_cl_FrecuenciaRespiratoria() {
        const value = await this.page.locator(this.frecuenciaRespiratoria).inputValue()
        const texto = await this.page.locator(this.cl_FrecuenciaRespiratoria)

        if (value >= 12 && value <= 20) {
            expect(texto).toHaveValue('Normal')
        } else if (value <= 12 && value >= 20) {
            await expect(texto).toHaveValue('Anormal')
        } else {
            throw new Error('VALOR NO ESPERADO')
        }

        console.log(
            'Frecuencia Respiratoria..', value,
            ' Clasificación Frecuencia Respiratoria..', await texto.inputValue()
        )

        await this.page.screenshot({ path: 'tests/Screenshots/SeccionMA/' + 'Signos.png' });
        console.log('')
    }



}

