#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float4 FragColor [[color(0)]];
};

// Returns 2D texture coords corresponding to 1D texel buffer coords
inline uint2 spvTexelBufferCoord(uint tc)
{
    return uint2(tc % 4096, tc / 4096);
}

fragment main0_out main0(texture2d<float> buf [[texture(0)]], texture2d<float, access::write> bufOut [[texture(1)]], float4 gl_FragCoord [[position]])
{
    main0_out out = {};
    out.FragColor = buf.read(spvTexelBufferCoord(0));
    bufOut.write(out.FragColor, spvTexelBufferCoord(int(gl_FragCoord.x)));
    return out;
}

