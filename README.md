# Quads to RDF+JSON

For outputting Quads from the RDF data model as `application/rdf+json`

See:
- https://rdf.js.org/data-model-spec/
- https://www.w3.org/TR/rdf-json/#overview-of-rdf-json

## Usage
```TypeScript
const quads: Array<Quad> = YourDataMethod()
const rdfJson = convertQuadsToRdfJson(quads)
```