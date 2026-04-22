/**
 * Double Project Sync
 * סנכרון משתנים בין פרויקטים באמצעות רדיו
 */
//% color="#4b7bec" icon="\uf0c9" block="Double"
namespace double {
    let syncAction: (name: string, value: number) => void;
    let remoteStore: { [key: string]: number } = {};

    /**
     * קביעת קבוצת הרדיו לחיבור בין הפרויקטים
     */
    //% block="connect to project on group %id"
    //% id.defl=1
    export function setProjectGroup(id: number): void {
        radio.setGroup(id);
    }

    /**
     * סנכרון משתנה מהמיקרוביט הזה לאחרים
     */
    //% block="sync variable %varName with value %varValue"
    export function broadcastVar(varName: string, varValue: number): void {
        radio.sendValue("v:" + varName, varValue);
    }

    /**
     * בלוק אירוע שמופעל כשמתקבל נתון מסונכרן.
     * הערכים 'name' ו-'value' הם נגררים (Reporters).
     */
    //% block="on variable received"
    //% draggableParameters="reporter"
    export function onSyncReceived(handler: (name: string, value: number) => void) {
        syncAction = handler;
    }

    // ניהול קבלת הנתונים - שימוש בשיטות בטוחות בלבד
    radio.onReceivedValue(function (receivedName, receivedValue) {
        // בדיקה אם המחרוזת מתחילה ב-:v (קידומת הסנכרון שלנו)
        if (receivedName.indexOf("v:") == 0) {
            let cleanName = receivedName.substr(2);
            remoteStore[cleanName] = receivedValue;

            if (syncAction) {
                syncAction(cleanName, receivedValue);
            }
        }
    })
}

/**
* Gebruik dit bestand om specifieke functies en blokken te definiëren.
* Lees meer op https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
