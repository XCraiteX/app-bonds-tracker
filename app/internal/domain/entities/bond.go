package entities

type Bond struct {
	Id       *uint16
	Name     string
	Nominal  uint16
	Coupon   uint16
	Months   string
	Day      uint16
	Quantity uint32
}