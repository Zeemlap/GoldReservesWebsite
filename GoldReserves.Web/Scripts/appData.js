﻿(function () {
    var g = this,
        x = g.x,
        hasOwnPropF = g.Object.prototype.hasOwnProperty,
        isArrayLike_nonSparse = x.isArrayLike_nonSparse,
        isDouble_integral = x.isDouble_integral,
        setOwnSrcPropsOnDst = x.setOwnSrcPropsOnDst,
        INTERNAL_KEY = {};

    function GeoRegion() {
        this.__id_alpha3 = null;
        this.__key = INTERNAL_KEY;
    }
    GeoRegion.prototype = {
        constructor: GeoRegion,
        getId_alpha3: function () {
            return this.__id_alpha3;
        },
        __setId_alpha3: function (value) {
            this.__id_alpha3 = value;
        }
    };

    function PoliticalEntity() {
        this.__id = 0;
        this.__languageIdFromName = {};
        this.__geoRegion = null;
        this.__key = INTERNAL_KEY;
    }
    PoliticalEntity.prototype = {
        constructor: PoliticalEntity,
        getGeoRegion: function() { return this.__geoRegion; },
        getId: function () { return this.__id; },
        __setGeoRegion: function (value) {
            if (value !== null && !(value instanceof GeoRegion)) throw Error();
            this.__geoRegion = value;
        },
        __setId: function (value) { this.__id = value; },
        __setLanguageIdFromName: function (value) {
            this.__languageIdFromName = value;
        }
    };

    function AppRepository() {
        this.__politicalEntities = [];
        this.__politicalEntityFromId = {};
        this.__politicalEntityFromName_uc = {};
        this.__geoRegions = [];
        this.__geoRegionFromId_alpha3 = {};
    }
    AppRepository.prototype = {
        constructor: AppRepository,
        getGeoRegion: function(id_alpha3) {
            var g;
            if (typeof id_alpha3 !== "string" || !/^[A-Z]{3}$/.test(id_alpha3)) throw Error();
            g = this.__geoRegionFromId_alpha3[id_alpha3];
            return g != null && g.__key === INTERNAL_KEY ? g : null;
        },
        getPoliticalEntity: function (v) {
            var p;
            if (isDouble_integral(v)) {
                p = this.__politicalEntityFromId[v];
            } else if (typeof v === "string") {
                p = this.__politicalEntityFromName_uc[v.toUpperCase()];
            }
            return p != null && p.__key === INTERNAL_KEY ? p : null;
        },
        __setGeoRegions: function (value) {
            var i, n, g, gid_a3, fromId_a3;;
            if (!isArrayLike_nonSparse(value)) throw Error();
            fromId_a3 = {};
            for (i = 0, n = value.length; i < n; i++) {
                g = value[i];
                if (!(g instanceof GeoRegion)) throw Error();
                gid_a3 = g.getId_alpha3();
                if (typeof gid_a3 !== "string" || !/^[A-Z]{3}$/.test(gid_a3) || hasOwnPropF.call(fromId_a3, gid_a3)) throw Error();
                fromId_a3[gid_a3] = g;
            }
            this.__geoRegions = value;
            this.__geoRegionFromId_alpha3 = fromId_a3;
        },
        __setPoliticalEntities: function (value) {
            var fromId;
            var fromName_uc;
            var i, n, p, pid, pname, j;
            var pnames_uc;
            if (!isArrayLike_nonSparse(value)) throw Error();
            fromId = {};
            fromName_uc = {};
            pnames_uc = [];
            for (n = value.length, i = 0; i < n; i++) {
                p = value[i];
                if (!(p instanceof PoliticalEntity)) throw Error();
                pid = p.getId();
                if (!isDouble_integral(pid) || hasOwnPropF.call(fromId, pid)) throw Error();

                j = -1;
                for (pname in p.__languageIdFromName) {
                    if (!hasOwnPropF.call(p.__languageIdFromName, pname)) break;    
                    pnames_uc[++j] = pname.toUpperCase();
                    if (hasOwnPropF.call(fromName_uc, pnames_uc[j])) throw Error();
                }
                while (-1 < j) {
                    fromName_uc[pnames_uc[j]] = p;
                    j -= 1;
                }
                fromId[pid] = p;
            }
            this.__politicalEntities = value;
            this.__politicalEntityFromId = fromId;
            this.__politicalEntityFromName_uc = fromName_uc;
        }
    };
    var appRepository = new AppRepository();
    AppRepository.getInstance = function () {
        return appRepository;
    };

    setOwnSrcPropsOnDst({
        GeoRegion: GeoRegion,
        PoliticalEntity: PoliticalEntity,
        AppRepository: AppRepository
    }, x);

})();