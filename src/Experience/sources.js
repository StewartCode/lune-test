export default [
    {
        name: 'why',
        type: 'gltfModel',
        path: 'models/luneLoPoly.glb'
    },
    {
        name: 'normal',
        type: 'texture',
        path: 'textures/Water 0325normal.jpg'
    },
    {
        name: 'normalModel',
        type: 'texture',
        path: 'textures/Stains8.png'
    },
    {
        name: 'standardNormal',
        type: 'texture',
        path: 'textures/standardNormalSML.png'
    },
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'environmentMaps/LinkageMap/px.png',
            'environmentMaps/LinkageMap/nx.png',
            'environmentMaps/LinkageMap/py.png',
            'environmentMaps/LinkageMap/ny.png',
            'environmentMaps/LinkageMap/pz.png',
            'environmentMaps/LinkageMap/nz.png'
        ]
    },
]