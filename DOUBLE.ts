//% color="#4b7bec" icon="\uf0c9" block="Double"
namespace double {
    let onSyncHandler: (name: string, value: number) => void;
    let remoteValues: { [key: string]: number } = {};

    /**
     * חיבור לפרויקט אחר דרך הרדיו
     */
    //% block="connect to project on group %id"
    export function connectProject(id: number): void {
        radio.setGroup(id);
    }

    /**
     * מסנכרן משתנה
     */
    //% block="sync variable %name with value %value"
    export function syncVar(name: string, value: number): void {
        radio.sendValue("s_" + name, value);
    }

    /**
     * קבלת ערך מרוחק
     */
    //% block="remote variable %name"
    export function getRemoteVar(name: string): number {
        return remoteValues[name] || 0;
    }

    /**
     * הבלוק המתוקן - ללא תפריטים נפתחים!
     */
    //% block="on variable synced"
    //% draggableParameters="reporter"
    export function onVariableSynced(handler: (name: string, value: number) => void) {
        onSyncHandler = handler;
    }

    radio.onReceivedValue(function (name, value) {
        if (name.startsWith("s_")) {
            let varName = name.substr(2);
            remoteValues[varName] = value;
            if (onSyncHandler) {
                onSyncHandler(varName, value);
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
