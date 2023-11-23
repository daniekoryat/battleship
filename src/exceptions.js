//ship placement errors
export class invalidCordinateError extends Error {
    constructor() {
        super();
        this.message = "invalid coordinates for ship placement";
        this.name = "invalidCoordinateError";
    }
}

export class notEnoughSpaceError extends Error {
    constructor() {
        super();
        this.message = "Not enough space to place the ship";
        this.name = "notEnoughSpaceError";
    }
}

export class alreadyContainShipError extends Error {
    constructor() {
        super();
        this.message = "Already contain a ship at the specified coordinates";
        this.name = "alreadyContainShipError";
    }
}

