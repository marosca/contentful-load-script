# Backups

## Hacer un backup

Modificar en el fichero **export-config**:

```json
"environmentId": Entorno (Ex:"staging"),
"managementToken": Añadiendo la key de management
"exportDir": Añadiendo la carpeta (Ex:"export-staging")
```

Ejecutar

```shell
npx contentful-cli space export --config libs/pepe-contentful/backup/export-config.json
```

## Restaurar un backup

Modificar en el fichero **import-config**:

```json
"environmentId": Entorno (Ex:"staging"),
"managementToken": Añadiendo la key de management,
"contentFile": Fichero de export (Ex:"export-staging/export.json"),
```

```shell
npx contentful-cli space import --config libs/pepe-contentful/backup/import-config.json
```

## Links

<https://www.contentful.com/developers/docs/tutorials/cli/installation/>
<https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/>
