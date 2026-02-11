export namespace entities {
	
	export class Bond {
	    Id?: number;
	    Name: string;
	    Nominal: number;
	    Coupon: number;
	    Months: string;
	    Day: number;
	    Quantity: number;
	
	    static createFrom(source: any = {}) {
	        return new Bond(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Nominal = source["Nominal"];
	        this.Coupon = source["Coupon"];
	        this.Months = source["Months"];
	        this.Day = source["Day"];
	        this.Quantity = source["Quantity"];
	    }
	}

}

