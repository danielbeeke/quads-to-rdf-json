import { convertQuadsToRdfJson } from './mod.ts'
import { assertEquals } from 'https://deno.land/std@0.158.0/testing/asserts.ts'

const quads = [{
	"termType": "Quad",
	"value": "",
	"subject": {
		"termType": "NamedNode",
		"value": "https://danielbeeke.nl#me"
	},
	"predicate": {
		"termType": "NamedNode",
		"value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
	},
	"object": {
		"termType": "NamedNode",
		"value": "http://xmlns.com/foaf/0.1/Person"
	},
	"graph": {
		"termType": "DefaultGraph",
		"value": ""
	}
}, {
	"termType": "Quad",
	"value": "",
	"subject": {
		"termType": "NamedNode",
		"value": "https://danielbeeke.nl#me"
	},
	"predicate": {
		"termType": "NamedNode",
		"value": "http://xmlns.com/foaf/0.1/name"
	},
	"object": {
		"termType": "Literal",
		"value": "Daniel Beeke",
		"language": "",
		"datatype": {
			"termType": "NamedNode",
			"value": "http://www.w3.org/2001/XMLSchema#string"
		}
	},
	"graph": {
		"termType": "DefaultGraph",
		"value": ""
	}
}, {
	"termType": "Quad",
	"value": "",
	"subject": {
		"termType": "BlankNode",
		"value": "bc_0_n3-31"
	},
	"predicate": {
		"termType": "NamedNode",
		"value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
	},
	"object": {
		"termType": "NamedNode",
		"value": "http://xmlns.com/foaf/0.1/Person"
	},
	"graph": {
		"termType": "DefaultGraph",
		"value": ""
	}
}, {
	"termType": "Quad",
	"value": "",
	"subject": {
		"termType": "BlankNode",
		"value": "bc_0_n3-31"
	},
	"predicate": {
		"termType": "NamedNode",
		"value": "http://xmlns.com/foaf/0.1/name"
	},
	"object": {
		"termType": "Literal",
		"value": "John Doo",
		"language": "",
		"datatype": {
			"termType": "NamedNode",
			"value": "http://www.w3.org/2001/XMLSchema#string"
		}
	},
	"graph": {
		"termType": "DefaultGraph",
		"value": ""
	}
}]

Deno.test("url test", () => {
  const json = convertQuadsToRdfJson(quads)

  assertEquals(json, {
    "https://danielbeeke.nl#me": {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [ { type: "uri", value: "http://xmlns.com/foaf/0.1/Person" } ],
      "http://xmlns.com/foaf/0.1/name": [
        {
          type: "literal",
          value: "Daniel Beeke",
          datatype: "http://www.w3.org/2001/XMLSchema#string"
        }
      ]
    },
    "bc_0_n3-31": {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [ { type: "uri", value: "http://xmlns.com/foaf/0.1/Person" } ],
      "http://xmlns.com/foaf/0.1/name": [
        {
          type: "literal",
          value: "John Doo",
          datatype: "http://www.w3.org/2001/XMLSchema#string"
        }
      ]
    }
  })
})

