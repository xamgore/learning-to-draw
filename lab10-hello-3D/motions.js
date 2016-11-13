Vertex.prototype.apply = function([as, bs, cs, _]) {
	let [x, y, z] = [this.x, this.y, this.z],
	 	[a1, a2, a3, a4] = as,
		[b1, b2, b3, b4] = bs,
		[c1, c2, c3, c4] = cs;

	this.x = x*a1 + y*a2 + z*a3 + a4;
	this.y = x*b1 + y*b2 + z*b3 + b4;
	this.z = x*c1 + y*c2 + z*c3 + c4;

	return this;
}

function mult(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

class M {
    static pipe(...matrixes) {
        return _.reduce(matrixes, mult);
    }

    static move(x, y, z) {
        return [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
    }

    static scale(x, y, z) {
        return [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
    }

    static rotateOx(phi) {
        return [[1, 0, 0, 0], [0, Math.cos(phi), Math.sin(phi), 0],
                [0, -Math.sin(phi), Math.cos(phi), 0], [0, 0, 0, 1]];
    }

    static rotateOy(psi) {
        return [[Math.cos(psi), 0, Math.sin(psi), 0], [0, 1, 0, 0],
                [-Math.sin(psi), 0, Math.cos(psi), 0], [0, 0, 0, 1]];
    }

    static rotateOz(hi) {
        return [[Math.cos(hi), Math.sin(hi), 0, 0],
                [-Math.sin(hi), Math.cos(hi), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

}
