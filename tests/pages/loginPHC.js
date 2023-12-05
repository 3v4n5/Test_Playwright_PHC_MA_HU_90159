import { page } from '@playwright/test';

export class LoginPHC{

    constructor( page ) {
        this.page = page;
        this.linkEmpleado =  page.getByRole('link', { name: 'Empleado Sura' })
        this.usuario = page.locator('#suranetName')
        this.contrasenia = page.locator('#suranetPassword')
        this.botonLogin = page.getByRole('button', { name: 'Iniciar sesión' })
        this.cerrarX = page.getByRole('link', { name: 'X' })
        this.btnAtenciontemporal = page.locator("//button[text()='Aceptar']")
    }

    async nuevoLoginPHC( usuario, contrasenia ) {
        if( await this.linkEmpleado.isVisible() ){ 
            await this.linkEmpleado.click()
        }
        else{
            throw new Error('No se encuentra Login Revisar ambiente PHC')
        }
        await this.usuario.fill( usuario );
        await this.contrasenia.fill( contrasenia );
        await this.page.screenshot({ path: 'tests/Screenshots/Login/' + 'Login.png' });
        await this.botonLogin.click()
        await this.cerrarX.click();
        
        // const btnAT = await this.btnAtenciontemporal
        // if ( btnAT.isVisible() ){
        //     await btnAT.click()
        // }
    }

}