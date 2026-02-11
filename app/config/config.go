package config

type Config struct {
	DBPath string
	Host   string
	Port   int
}

func Load() Config {
	return Config{
		DBPath: "database/sql.db",
		Host:   "localhost",
		Port:   8080,
	}
}