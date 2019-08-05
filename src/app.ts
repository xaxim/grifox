/// <reference path="example_module.ts" />

namespace userscript {
    export let init = () => {
        let saldo: number = 0;
        for (let semana = 1; semana <= 5; semana++) {
            // tslint:disable: max-line-length
            const tempoPendente = document.querySelector(`#divSecaoTotaisSemanais > fieldset > table > tbody > tr:nth-child(${semana}) > td:nth-child(6)`);
            const tempoExcedente = document.querySelector(`#divSecaoTotaisSemanais > fieldset > table > tbody > tr:nth-child(${semana}) > td:nth-child(7)`);
            if (tempoPendente && tempoPendente.textContent && tempoExcedente && tempoExcedente.textContent) {
                const tempoPendenteStr = tempoPendente.textContent.trim();
                const tempoExcedenteStr = tempoExcedente.textContent.trim();
                const [horasPendente, minPendentes] = tempoPendenteStr.split(':');
                const [horasExcedente, minExcedente] = tempoExcedenteStr.split(':');
                const totalExcedente = Number(horasExcedente) * 60 + Number(minExcedente);
                const totalPendente = Number(horasPendente) * 60 + Number(minPendentes);
                saldo += totalExcedente - totalPendente;
                const h = Math.round(saldo / 60);
                const m = saldo > 0 ? saldo % 60 : (saldo % 60) * -1;
                const mm = m < 10 ? `0${m}` : m;
                console.log(`Saldo até a semana ${semana}: ${h}:${mm}  (${saldo} minutos)`);
            }
        }

    };
}

userscript.init();
example.msngr('runnin');
