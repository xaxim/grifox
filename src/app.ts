/// <reference path="example_module.ts" />

namespace userscript {
    export const time: string = '##timestamp##';
    export let init = () => {
        console.log(time);
        const temposPendentes: any[] = [];
        const temposExcedentes: any[] = [];
        let saldo: number = 0;
        for (let semana = 1; semana <= 6; semana++) {
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
                console.log(`Saldo até a semana ${semana} em minutos: ${saldo}`);
                const h = Math.round(saldo / 60);
                const m = saldo > 0 ? saldo % 60 : (saldo % 60) * -1;
                const mm = m < 10 ? `0${m}` : m;
                console.log(`Saldo até a semana ${semana}: ${h}:${mm}`);
            }
            temposPendentes[semana] = tempoPendente ? tempoPendente.textContent ? tempoPendente.textContent.trim() : '00:00' : '00:00';
            temposExcedentes[semana] = tempoExcedente ? tempoExcedente.textContent ? tempoExcedente.textContent.trim() : '00:00' : '00:00';
        }

    };
}

userscript.init();
example.msngr('runnin');
