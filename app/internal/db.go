package database

import (
	"app/config"
	"database/sql"

	_ "github.com/glebarez/go-sqlite"
)

func Connect() *sql.DB {
	db, err := sql.Open("sqlite", config.Load().DBPath)

	if err != nil {
		panic(err)
	}

	return db
}

func InitSchema() {
	db := Connect()

	db.Exec(`
	CREATE TABLE IF NOT EXISTS portfolios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL
	)`)
	db.Exec(`
	CREATE TABLE IF NOT EXISTS bonds (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		portfolio INTEGER REFERENCES portfolios (id),
		name TEXT NOT NULL,
		nominal REAL NOT NULL,
		coupon REAL NOT NULL,
		months TEXT NOT NULL,
		day INTEGER NOT NULL,
		quantity INTEGER NOT NULL
	)`)
}